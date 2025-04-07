'use client'
import Button from "@/components/buttons";
import Container from "@/components/container";
import Header from "@/components/header";
import { Select } from "@/components/select";

import Title from "@/components/titles";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";
import { useVehicles } from "@/hooks/useVehicles";

import { useEffect, useState } from "react";

export type FilterTypes = {
    fuelTypeFilter: string,
    vehicleYearFilter: string | number,
    referenceMonthFilter: string | number,
    referenceYearFilter: string | number
}

export default function Home(){
    type FuelType = {
        fuelTypeId: string;
        fuelTypeName: string;
    };

    const [values, setValues] = useState({
        brand: '',
        model: '',
    })
   const [vehicleYearsOptions, setVehicleYearsOptions] = useState<number[]>([])
   const [vehicleYearFilter, setVehicleYearFilter] = useState('')

    const [fuelTypeFilter, setFuelTypeFilter] = useState('');
    const [fuelTypesOptions, setFuelTypesOptions] = useState<FuelType[]>([]);

    const [referenceMonthFilter, setReferenceMonthFilter] = useState('');
    const [referenceMonthOptions, setReferenceMonthOptions] = useState<number[]>([]);

    const [referenceYearFilter, setReferenceYearFilter] = useState('');
    const [referenceYearOptions, setReferenceYearOptions] = useState<number[]>([]);


    const filterValues = {
        fuelTypeFilter,
        vehicleYearFilter,
        referenceMonthFilter,
        referenceYearFilter
    }

    const { brands, isLoading } = useBrands();
    const { models } = useModels(values.brand);
    const { vehiclesResponse, vehiclesFilterdByModel } = useVehicles(values.model, filterValues)

    useEffect(() => {
       
        setFuelTypeFilter('')
        setReferenceYearFilter('')
        setReferenceMonthFilter('')
    }, [values.brand, values.model])


    useEffect(() => {
        setReferenceMonthOptions([... new Set(vehiclesResponse?.map(vehicle => vehicle.referenceMonth))])
        setReferenceYearOptions([... new Set(vehiclesResponse?.map(vehicle => vehicle.referenceYear))])
        setFuelTypesOptions([...new Map(
            vehiclesFilterdByModel?.map(vehicle => [
                vehicle.fuelTypeId,
            {
                fuelTypeId: vehicle.fuelTypeId,
                fuelTypeName: vehicle.fuelType.name
            }])).values()]);
        //ssetVehicleYearsOptions([... new Set(vehiclesFilterdByModel?.map(vehicle => vehicle.vehicleYear))])


    }, [vehiclesFilterdByModel])

    
    // useEffect(() => {
    //     setVehicleYearFilter('')
    //     setVehicleYearsOptions([... new Set(vehiclesResponse?.map(vehicle => vehicle.vehicleYear))])
    //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", vehiclesResponse?.map(vehicle => vehicle.vehicleYear))
    // }, [fuelTypeFilter])

    // console.log("REPONSE hook", vehiclesResponse)
    // console.log("filtered hook", vehiclesFilterdByModel)

    // useEffect(() => {
        
    //     if (fuelTypeFilter !== '' && vehicleYearFilter === '') {
    //         setVehicleYearsOptions([... new Set(vehiclesResponse?.map(vehicle => vehicle.vehicleYear))])
    //     }

    //     if (fuelTypeFilter === '' && vehicleYearFilter !== '') {
    //         setFuelTypesOptions([...new Map(
    //             vehiclesResponse?.map(vehicle => [
    //                 vehicle.fuelTypeId,
    //             {
    //                 fuelTypeId: vehicle.fuelTypeId,
    //                 fuelTypeName: vehicle.fuelType.name
    //             }])).values()]);
    // }}, [fuelTypeFilter, vehicleYearFilter])


    const [CarValueResponse, setCarValueResponse] = useState(0);
    const [showValue, setShowValue] = useState(false);

    useEffect(() => {
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
                setFuelTypeFilter(value);
                if (fuelTypeFilter !== '' && vehicleYearFilter === '') {
                    setVehicleYearsOptions([... new Set(vehiclesResponse?.map(vehicle => vehicle.vehicleYear))])
                }
                break;
            case 'vehicleYear':
                if (fuelTypeFilter === '' && vehicleYearFilter !== '') {
                    setFuelTypesOptions([...new Map(
                        vehiclesResponse?.map(vehicle => [
                            vehicle.fuelTypeId,
                        {
                            fuelTypeId: vehicle.fuelTypeId,
                            fuelTypeName: vehicle.fuelType.name
                        }])).values()]);}
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

    if (isLoading)
        { return(<p>carregando</p>)}
    else{ 
        return(
            <div className="bg-white min-h-screen">
                <Header/>
                <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)]">
                    <Container classNameOp="flex flex-col gap-2 pb-0 pl-0 pr-0">
                            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
                                <Title variant="title">
                                    Consultar tabela Fipe
                                </Title>
                                <Select id="brand" placeholder={"Selecione uma marca..."} value={values.brand} onChange={handleSelectChange}>
                                    {
                                        (brands?.map((brand) => (
                                            <option value={brand.id} key={brand.id}>
                                                {brand.name}
                                            </option>
                                        )))
                                    }
                                </Select>
                                
                                <Select id="model" placeholder={"Selecione um modelo..."} value={values.model} onChange={handleSelectChange}>
                                    {
                                        (models?.map((model) => (
                                            <option value={model.id} key={model.id}>
                                                {model.name}
                                            </option>
                                        )))

                                    }
                                </Select>

                                <Select id="fuelTypeId" placeholder={"Selecione um combustível..."} value={fuelTypeFilter} onChange={handleSelectChange}>
                                {
                                        (fuelTypesOptions?.map((fuelTypesOption) => (
                                            <option value={fuelTypesOption.fuelTypeId} key={fuelTypesOption.fuelTypeId}>
                                                {fuelTypesOption.fuelTypeName}
                                            </option>
                                        )))
                                    }
                                </Select>
        
                                <Select id="vehicleYear" placeholder={"Selecione o ano..."} value={vehicleYearFilter} onChange={handleSelectChange}>
                                {
                                        (vehicleYearsOptions?.map((vehicleYearsOption) => (
                                            <option value={vehicleYearsOption} key={vehicleYearsOption}>
                                                {vehicleYearsOption}
                                            </option>
                                        )))
                                    }
                                </Select>

                                <Button type="submit">
                                    Pesquisar
                                </Button>
                            </form>
                        

                        <div className="bg-[#002265] w-5xl h-auto rounded-bl-2xl rounded-br-2xl p-3 flex flex-col justify-self-center items-center">
                            {showValue && (
                                <Title variant="title" className="text-white"> {CarValueResponse} </Title>)
                            }
                            <hr className="text-white w-1/2"/>
                            <div className="w-2/3 flex flex-row gap-2 justify-center items-center p-1">
                                <Title  variant="caption" className="text-white">Data de referência: </Title>
                                <Select id="referenceMonth" classNameOp="!w-18 h-8" placeholder={"Mês"} value={referenceMonthFilter} onChange={handleSelectChange}>
                                {
                                        (referenceMonthOptions?.map((referenceMonthOption) => (
                                            <option value={referenceMonthOption} key={referenceMonthOption}>
                                                {referenceMonthOption}
                                            </option>
                                        )))
                                    }
                                </Select>
                                <Title  variant="caption" className="text-white">/</Title>
                                <Select id="referenceYear"  classNameOp="!w-22 h-8" placeholder={"Ano"} value={referenceYearFilter} onChange={handleSelectChange}>
                                {
                                        (referenceYearOptions?.map((referenceYearOption) => (
                                            <option value={referenceYearOption} key={referenceYearOption}>
                                                {referenceYearOption}
                                            </option>
                                        )))
                                    }
                                </Select>

                            </div>
                        </div>

                    </Container>

                </div>
            </div>
    )
}
}