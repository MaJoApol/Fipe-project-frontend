/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Button from "@/components/buttons";
import Container from "@/components/container";
import Header from "@/components/header";
import { Select } from "@/components/select";

import Title from "@/components/titles";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";
import { useVehicles } from "@/hooks/useVehicles";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from 'react-responsive';

export type FilterTypes = {
    fuelTypeIdFilter: string,
    vehicleYearFilter: string | number,
    referenceMonthFilter: string | number,
    referenceYearFilter: string | number
}

export default function Home() {

    const isMobile = useMediaQuery({ maxWidth: 768 })

    const [vehicleYearFilter, setVehicleYearFilter] = useState('')

    const [fuelTypeIdFilter, setFuelTypeIdFilter] = useState('');

    const [referenceMonthFilter, setReferenceMonthFilter] = useState('');
    const [referenceMonthOptions, setReferenceMonthOptions] = useState<number[]>([]);
    
    const [referenceYearFilter, setReferenceYearFilter] = useState('');
    const [referenceYearOptions, setReferenceYearOptions] = useState<number[]>([]);

    const filterValues = { //maybe change for fueltypeId, and change Filter for Selected
        fuelTypeIdFilter,
        vehicleYearFilter,
        referenceMonthFilter,
        referenceYearFilter
    }

    const [values, setValues] = useState({
        brand: '',
        model: '',
    })

    const { brands, isLoading } = useBrands();
    const { models } = useModels(values.brand);

    const { vehiclesResponse } = useVehicles(values.model, filterValues)

    const filteredByModels = useMemo(() => {
        if (!vehiclesResponse || !values.model) return [];
        return vehiclesResponse.filter(v => v.modelId === values.model);
    }, [vehiclesResponse, values.model]);

    
    const fuelTypesOptions = useMemo(() => {
        if (!filteredByModels.length) return [];
        return [...new Map(
            filteredByModels.map(vehicle => [
                vehicle.fuelTypeId,
                {
                    fuelTypeId: vehicle.fuelTypeId,
                    fuelTypeName: vehicle.fuelType.name,
                },
            ])
        ).values()];
    }, [filteredByModels]);

    const vehicleYearsOptions = useMemo(() => {
        if (!filteredByModels.length) return [];
        return [...new Set(filteredByModels.map(vehicle => vehicle.vehicleYear))].sort((a, b) => b - a);
    }, [filteredByModels]);


    const filteredFuelTypes = useMemo(() => {
        if (!vehicleYearFilter) return fuelTypesOptions;
        return fuelTypesOptions.filter(fuelType =>
            filteredByModels.some(vehicle =>
                vehicle.fuelTypeId === fuelType.fuelTypeId &&
                vehicle.vehicleYear === Number(vehicleYearFilter)
            )
        );
    }, [vehicleYearFilter, fuelTypesOptions, filteredByModels]);


    const filteredVehiclesYears = useMemo(() => {
        if (!fuelTypeIdFilter) return vehicleYearsOptions;
        return vehicleYearsOptions.filter(year =>
            filteredByModels.some(vehicle =>
                vehicle.fuelTypeId === fuelTypeIdFilter &&
                vehicle.vehicleYear === year
            )
        );
    }, [fuelTypeIdFilter, vehicleYearsOptions, filteredByModels]);

    const fuelTypesToShow = vehicleYearFilter ? filteredFuelTypes : fuelTypesOptions;
    const vehicleYearsToShow = fuelTypeIdFilter ? filteredVehiclesYears : vehicleYearsOptions;

    const filteredByFilters = useMemo(() => {
        if (!fuelTypeIdFilter || !vehicleYearFilter) return [];
        return vehiclesResponse?.filter(v => v.modelId === values.model);
    }, [fuelTypeIdFilter, vehicleYearFilter]);
   

    useEffect(() => {
        if (fuelTypeIdFilter && vehicleYearFilter) {
            const referenceYears = [...new Set(filteredByFilters?.map(vehicle => vehicle.referenceYear))].sort((a, b) => b - a);
            setReferenceYearOptions(referenceYears);

            if (referenceYears.length > 0 && (!referenceYearFilter || !referenceYears.includes(Number(referenceYearFilter)))) {
                const mostRecentYear = referenceYears[0];
                setReferenceYearFilter(mostRecentYear.toString()); // Atualiza o filtro com o valor mais recente
            }
        }
       
    }, [fuelTypeIdFilter, vehicleYearFilter, filteredByFilters]);

    useEffect(() => {
        if (referenceYearFilter) {
            const monthFilteredByYear = filteredByFilters?.filter(vehicle => vehicle.referenceYear === Number(referenceYearFilter));
            const referenceMonths = [...new Set(monthFilteredByYear?.map(vehicle => vehicle.referenceMonth))].sort((a, b) => b - a);
            setReferenceMonthOptions(referenceMonths);

            if (referenceMonths.length > 0 && (!referenceMonthFilter || !referenceMonths.includes(Number(referenceMonthFilter)))) {
                setReferenceMonthFilter(referenceMonths[0].toString()); // Atualiza o filtro com o mês mais recente
            }
        }
    }, [referenceYearFilter, filteredByFilters]);

    useEffect(() => {
        setVehicleYearFilter('')
        setFuelTypeIdFilter('')
        setReferenceYearFilter('')
        setReferenceMonthFilter('')
    }, [values.brand, values.model])


    const [CarValueResponse, setCarValueResponse] = useState(0);
    const [showValue, setShowValue] = useState(false);

    useEffect(() => {
        if (vehiclesResponse?.length === 1) {
            setCarValueResponse(vehiclesResponse?.[0].value)
        }

    }, [vehiclesResponse])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (CarValueResponse !== 0 && vehicleYearFilter !== '' && fuelTypeIdFilter !== '' && values.brand !== '' && values.model !== '' && referenceMonthFilter !== '' && referenceYearFilter !== '') {
            setShowValue(true)
        }
        else {
            setShowValue(false)
        }

    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = event.target;

        setShowValue(false)

        switch (id) {
            case 'fuelTypeId':
                setFuelTypeIdFilter(value);
                break;
            case 'vehicleYear':
                setVehicleYearFilter(value);
                break;
            case 'brand':
                setValues({ ...values, [id]: value })
                break;
            case 'model':
                setValues({ ...values, [id]: value })
                break;
            case 'referenceMonth':
                setReferenceMonthFilter(value);
                break;
            case 'referenceYear':
                setReferenceYearFilter(value);
                break;
        }
    }

    if (isLoading) { return (<p>carregando</p>) }
    else {
        return (
            !isMobile ?
                (
                    <div className="bg-white min-h-screen">
                        <Header />
                        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)]">
                            <Container classNameOp="flex flex-col justify-between h-130 pb-0 pl-0 pr-0">
                                <form onSubmit={handleSubmit} className=" flex flex-col h-full">
                                    <div className=" flex flex-col items-center justify-around h-full">
                                        <div className="flex justify-center items-center">
                                            <Title variant="title">
                                                Consultar tabela Fipe
                                            </Title>
                                        </div>
                                        <div className="flex flex-col pt-7 pb-4 h-full w-4/5 justify-around">
                                            <Select id="brand" placeholder={"Selecione uma marca..."} onClear={() => setValues({ ...values, brand: '' })} value={values.brand} onChange={handleSelectChange}>
                                                {
                                                    (brands?.map((brand) => (
                                                        <option value={brand.id} key={brand.id}>
                                                            {brand.name}
                                                        </option>
                                                    )))
                                                }
                                            </Select>

                                            <Select id="model" placeholder={"Selecione um modelo..."} value={values.model} onClear={() => setValues({ ...values, model: '' })} onChange={handleSelectChange}>
                                                {models ? (
                                                    models.map((model) => (
                                                        <option value={model.id} key={model.id}>
                                                            {model.name}
                                                        </option>
                                                    ))
                                                ) : null}
                                            </Select>

                                            <div className="flex flex-row w-full justify-between">
                                                <Select id="fuelTypeId" classNameOp="!w-80" placeholder={"Selecione um combustível..."} onClear={() => { setFuelTypeIdFilter(''); setVehicleYearFilter('') }} value={fuelTypeIdFilter} onChange={handleSelectChange}>
                                                    {
                                                        (fuelTypesToShow?.map((fuelTypesOption) => (
                                                            <option value={fuelTypesOption.fuelTypeId} key={fuelTypesOption.fuelTypeId}>
                                                                {fuelTypesOption.fuelTypeName}
                                                            </option>
                                                        )))
                                                    }
                                                </Select>

                                                <Select id="vehicleYear" classNameOp="!w-120" placeholder={"Selecione o ano..."} value={vehicleYearFilter} onClear={() => { setFuelTypeIdFilter(''); setVehicleYearFilter('') }} onChange={handleSelectChange}>
                                                    {
                                                        (vehicleYearsToShow?.map((vehicleYearsOption) => (
                                                            <option value={vehicleYearsOption} key={vehicleYearsOption}>
                                                                {vehicleYearsOption}
                                                            </option>
                                                        )))
                                                    }
                                                </Select>


                                            </div>

                                            {vehicleYearFilter && fuelTypeIdFilter ? (

                                                <div className="flex flex-col items-center">
                                                    <Button size='sm' className="w-1/5" type="submit">
                                                        Pesquisar
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center opacity-60">
                                                    <Button disabled size='sm' className="w-1/5 pointer-events-none" type="submit">
                                                        Pesquisar
                                                    </Button>
                                                </div>
                                            )}

                                        </div>

                                        <div className="bg-[#CFDDF4] w-5xl  min-h-31 rounded-bl-2xl rounded-br-2xl p-3 flex flex-col justify-end items-center">
                                            {showValue && (
                                                <Title variant="title" className="text-black"> {CarValueResponse} </Title>)
                                            }
                                            <hr className="text-black w-1/2" />
                                            <div className="w-2/3 flex flex-row gap-2 justify-center items-center p-1">
                                                <Title variant="caption" className="text-black">Data de referência: </Title>
                                                {vehicleYearFilter && fuelTypeIdFilter ?
                                                    (
                                                        <>
                                                            <Select id="referenceMonth" variant="small" placeholder={"Mês"} onClear={() => setReferenceMonthFilter('')} value={referenceMonthFilter} onChange={handleSelectChange}>
                                                                {
                                                                    (referenceMonthOptions?.map((referenceMonthOption) => (
                                                                        <option value={referenceMonthOption} key={referenceMonthOption}>
                                                                            {referenceMonthOption}
                                                                        </option>
                                                                    )))
                                                                }
                                                            </Select>
                                                            <Title variant="caption" className="text-black">/</Title>


                                                            <Select
                                                                id="referenceYear"
                                                                variant="small"
                                                                placeholder={"Ano"}
                                                                onClear={() => setReferenceYearFilter('')}
                                                                value={referenceYearFilter}
                                                                onChange={handleSelectChange}
                                                            >
                                                                {
                                                                    referenceYearOptions?.map((referenceYearOption) => (
                                                                        <option value={referenceYearOption} key={referenceYearOption}>
                                                                            {referenceYearOption}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Select variant="smallUnactive" placeholder={"Mês"} disabled value={''}>
                                                                {null}
                                                            </Select>
                                                            <Title variant="caption" className="text-black">/</Title>


                                                            <Select variant="smallUnactive" placeholder={"Ano"} disabled value={''}>
                                                                {null}
                                                            </Select></>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </Container>

                        </div>
                    </div>
                )
                :
                (
                    <div className="bg-white min-h-screen">
                        <Header />
                        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)]">
                            <Container classNameOp="flex flex-col justify-between w-6/7 h-130 pb-0 pl-0 pr-0">
                                <form onSubmit={handleSubmit} className=" flex flex-col h-full">
                                    <div className=" flex flex-col items-center justify-around h-full">
                                        <div className="flex justify-center items-center">
                                            <Title variant="label">
                                                Consultar
                                                <br />
                                                tabela Fipe
                                            </Title>
                                        </div>
                                        <div className="flex flex-col flex-auto pt-4 pb-4 h-full w-6/7 justify-around">
                                            <Select id="brand" placeholder={"Selecione uma marca..."} onClear={() => setValues({ ...values, brand: '' })} value={values.brand} onChange={handleSelectChange}>
                                                {
                                                    (brands?.map((brand) => (
                                                        <option value={brand.id} key={brand.id}>
                                                            {brand.name}
                                                        </option>
                                                    )))
                                                }
                                            </Select>

                                            <Select id="model" placeholder={"Selecione um modelo..."} value={values.model} onClear={() => setValues({ ...values, model: '' })} onChange={handleSelectChange}>
                                                {models ? (
                                                    models.map((model) => (
                                                        <option value={model.id} key={model.id}>
                                                            {model.name}
                                                        </option>
                                                    ))
                                                ) : null}
                                            </Select>

                                            {/*<Select id="fuelTypeId" placeholder={"Selecione um combustível..."}  onClear={() => setFuelTypeIdFilter('')} value={fuelTypeIdFilter} onChange={handleSelectChange}>
                                                {
                                                    (fuelTypesToShow?.map((fuelTypesOption) => (
                                                        <option value={fuelTypesOption.fuelTypeId} key={fuelTypesOption.fuelTypeId}>
                                                            {fuelTypesOption.fuelTypeName}
                                                        </option>
                                                    )))
                                                }
                                            </Select>
                    
                                            <Select id="vehicleYear" placeholder={"Selecione o ano..."} value={vehicleYearFilter} onClear={() => setVehicleYearFilter('')} onChange={handleSelectChange}>
                                                { 
                                                    (vehicleYearsToShow?.map((vehicleYearsOption) => (
                                                        <option value={vehicleYearsOption} key={vehicleYearsOption}>
                                                            {vehicleYearsOption}
                                                        </option>
                                                    )))
                                                }
                                            </Select>

                                            { vehicleYearFilter && fuelTypeIdFilter ? (

                                                <div className="flex flex-col items-center">
                                                    <Button size='sm' className="w-fit" type="submit">
                                                        Pesquisar
                                                    </Button>
                                                </div>   
                                            ):(
                                                <div className="flex flex-col items-center opacity-60">
                                                    <Button disabled size='sm' className="w-fit pointer-events-none" type="submit">
                                                        Pesquisar
                                                    </Button>
                                                </div>   
                                            )}
                                             */}
                                        </div>

                                        <div className="bg-[#CFDDF4] w-full min-h-31 rounded-bl-2xl rounded-br-2xl p-3 flex flex-col justify-end items-center">
                                            {showValue && (
                                                <Title variant="title" className="text-black"> {CarValueResponse} </Title>)
                                            }
                                            <hr className="text-black w-1/2" />
                                            <div className="w-fit flex flex-row gap-2 justify-center items-center p-1">
                                                <Title variant="caption" className="text-black">Data de referência: </Title>
                                                {vehicleYearFilter && fuelTypeIdFilter ?
                                                    (
                                                        <>
                                                            <Select id="referenceMonth" variant="small" placeholder={"Mês"} onClear={() => setReferenceMonthFilter('')} value={referenceMonthFilter} onChange={handleSelectChange}>
                                                                {
                                                                    (referenceMonthOptions?.map((referenceMonthOption) => (
                                                                        <option value={referenceMonthOption} key={referenceMonthOption}>
                                                                            {referenceMonthOption}
                                                                        </option>
                                                                    )))
                                                                }
                                                            </Select>
                                                            <Title variant="caption" className="text-black">/</Title>


                                                            <Select
                                                                id="referenceYear"
                                                                variant="small"
                                                                placeholder={"Ano"}
                                                                onClear={() => setReferenceYearFilter('')}
                                                                value={referenceYearFilter}
                                                                onChange={handleSelectChange}
                                                            >
                                                                {
                                                                    referenceYearOptions?.map((referenceYearOption) => (
                                                                        <option value={referenceYearOption} key={referenceYearOption}>
                                                                            {referenceYearOption}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Select variant="small" placeholder={"Mês"} classNameOp="!bg-[#CFDDF4] !w-10 text-xs pointer-events-none" disabled value={''}>
                                                                {null}
                                                            </Select>
                                                            <Title variant="caption" className="text-black">/</Title>


                                                            <Select variant="small" placeholder={"Ano"} classNameOp="!bg-[#CFDDF4] !w-10 text-xs pointer-events-none" disabled value={''}>
                                                                {null}
                                                            </Select></>
                                                    )}
                                            </div>
                                        </div>

                                    </div>

                                </form>
                            </Container>

                        </div>
                    </div>
                )
        )
    }
}