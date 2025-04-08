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

export type FilterTypes = {
    fuelTypeIdFilter: string,
    vehicleYearFilter: string | number,
    referenceMonthFilter: string | number,
    referenceYearFilter: string | number
}

export default function Home(){

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
    const { vehiclesResponse, vehiclesFilterdByModel, vehiclesWithoutHistoric } = useVehicles(values.model, filterValues)

    const referenceYearOptionCurrent = [...new Set(vehiclesResponse?.map(vehicle => vehicle.referenceYear))].sort((a,b) => b - a);
    useEffect(() => {
        if (referenceYearOptionCurrent.length > 0 && !referenceYearFilter) {
            setReferenceYearFilter(Math.max(...referenceYearOptionCurrent).toString())
        }
    }, [referenceYearOptions]);
   
  
    const fuelTypesOptions = useMemo(() => {
        if (!vehiclesFilterdByModel) return [];

        return [...new Map(
            vehiclesFilterdByModel.map(vehicle => [
                vehicle.fuelTypeId,
                {
                    fuelTypeId: vehicle.fuelTypeId,
                    fuelTypeName: vehicle.fuelType.name,
                },
            ]),
        ).values()];
    }, [vehiclesFilterdByModel]); 

    const vehicleYearsOptions = useMemo(() => {
        if (!vehiclesFilterdByModel) return [];

        return [...new Set(
            vehiclesFilterdByModel.map(vehicle => vehicle.vehicleYear)
        )];
    }, [vehiclesFilterdByModel]);

    const filteredFuelTypes = useMemo(() => {

        if (!vehiclesFilterdByModel) return [];
        if (!vehicleYearFilter) return fuelTypesOptions;

        if(vehicleYearFilter || fuelTypeIdFilter === '') {
            
            return [...new Map(
                vehiclesFilterdByModel.filter(vehicle => vehicle.vehicleYear === Number(vehicleYearFilter))
                .map(vehicle => [vehicle.fuelTypeId, {
                    fuelTypeId: vehicle.fuelTypeId,
                    fuelTypeName: vehicle.fuelType.name,
                }])).values()];
        };
    },[vehicleYearFilter, vehiclesFilterdByModel, fuelTypeIdFilter])

    const filteredVehiclesYears = useMemo(() => {

        if (!vehiclesFilterdByModel) return [];
        if (!fuelTypeIdFilter) return vehicleYearsOptions;

        if (fuelTypeIdFilter || vehicleYearFilter === '') {
            
            return [... new Set(vehiclesFilterdByModel?.filter(vehicle => vehicle.fuelTypeId === fuelTypeIdFilter)
                .map(vehicle => vehicle.vehicleYear))]
        }
    
    },[fuelTypeIdFilter, vehiclesFilterdByModel, vehicleYearFilter])

    const fuelTypesToShow = vehicleYearFilter ? filteredFuelTypes : fuelTypesOptions;
    const vehicleYearsToShow = fuelTypeIdFilter ? filteredVehiclesYears : vehicleYearsOptions;
   


    useEffect(() => {
        setVehicleYearFilter('')
        setFuelTypeIdFilter('')
        setReferenceYearFilter('')
        setReferenceMonthFilter('')
    }, [values.brand, values.model])


    const [CarValueResponse, setCarValueResponse] = useState(0);
    const [showValue, setShowValue] = useState(false);

    useEffect(() => {
        console.log("vehicle response", vehiclesResponse)
        if (vehiclesResponse?.length === 1) {
            setCarValueResponse(vehiclesResponse?.[0].value)
        }
    
    },[vehiclesResponse])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (CarValueResponse !== 0) {
            setShowValue(true)
        }

    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = event.target;

        setShowValue(false)

        switch (id){
            case 'fuelTypeId':
                setFuelTypeIdFilter(value);
                break;
            case 'vehicleYear':
                setVehicleYearFilter(value); 
                break;
            case 'brand':
                setValues({...values, [id]: value})
                break;
            case 'model':         
                setValues({...values, [id]: value})
                break;
            case 'referenceMonth':
                setReferenceMonthFilter(value);
                break;
            case 'referenceYear':      
                setReferenceYearFilter(value);
                break;
        }
    }

    
    useEffect(() => {
        
        if (!vehicleYearFilter || !fuelTypeIdFilter) return;
        
        if (fuelTypeIdFilter && vehicleYearFilter){
            setReferenceYearOptions([... new Set(vehiclesWithoutHistoric?.map(vehicle => vehicle.referenceYear))])
            const monthFiltered = [...new Set(vehiclesWithoutHistoric?.filter(vehicle => vehicle.referenceYear === Number(referenceYearFilter)).map(vehicle => vehicle.referenceMonth))]
            setReferenceMonthOptions(monthFiltered)   

            if(monthFiltered.length > 0 && !monthFiltered.includes(Number(referenceMonthFilter))){
                setReferenceMonthFilter('')
            }
        }
    }, [vehiclesResponse, fuelTypeIdFilter, vehicleYearFilter])


    if (isLoading)
        { return(<p>carregando</p>)}
    else{ 
        return(
            <div className="bg-white min-h-screen">
                <Header/>
                <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)]">
                    <Container classNameOp="flex flex-col gap-2 pb-0 pl-0 pr-0">
                            <form onSubmit={handleSubmit} className=" flex flex-col">
                                <div className="p-4 flex flex-col gap-2">                                
                                    <Title variant="title">
                                        Consultar tabela Fipe
                                    </Title>
                                    <Select id="brand" placeholder={"Selecione uma marca..."}  onClear={() => setValues({...values, brand: ''})} value={values.brand} onChange={handleSelectChange}>
                                        {
                                            (brands?.map((brand) => (
                                                <option value={brand.id} key={brand.id}>
                                                    {brand.name}
                                                </option>
                                            )))
                                        }
                                    </Select>
                                    
                                    <Select id="model" placeholder={"Selecione um modelo..."} value={values.model}  onClear={() => setValues({...values, model: ''})} onChange={handleSelectChange}>
                                        {models ? (
                                            models.map((model) => (
                                                <option value={model.id} key={model.id}>
                                                    {model.name}
                                                </option>
                                            ))
                                        ) : null}
                                    </Select>

                                    <Select id="fuelTypeId" placeholder={"Selecione um combustível..."}  onClear={() => setFuelTypeIdFilter('')} value={fuelTypeIdFilter} onChange={handleSelectChange}>
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

                                    <Button type="submit">
                                        Pesquisar
                                    </Button>
                                    </div>
                                
                            

                            
                                    <div className="bg-[#002265] w-5xl h-auto rounded-bl-2xl rounded-br-2xl p-3 flex flex-col justify-self-center items-center">
                                        {showValue && (
                                            <Title variant="title" className="text-white"> {CarValueResponse} </Title>)
                                        }
                                        <hr className="text-white w-1/2"/>
                                        <div className="w-2/3 flex flex-row gap-2 justify-center items-center p-1">
                                        <Title  variant="caption" className="text-white">Data de referência: </Title>
                                        { vehicleYearFilter && fuelTypeIdFilter ?
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
                                            <Title  variant="caption" className="text-white">/</Title>


                                            <Select id="referenceYear"  variant="small" placeholder={"Ano"} onClear={() => setReferenceYearFilter('')} value={referenceYearFilter} onChange={handleSelectChange}>                              
                                                {
                                                        (referenceYearOptions?.map((referenceYearOption) => (
                                                            <option value={referenceYearOption} key={referenceYearOption}>
                                                                {referenceYearOption}
                                                            </option>
                                                        )))
                                                
                                                }
                                            </Select></>
                                            ): (
                                            null
                                            )}
                                        </div>
                                    </div>
                                
                            
                           
                           
                        </form>
                    </Container>

                </div>
            </div>
    )
}
}