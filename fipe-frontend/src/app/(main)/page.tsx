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
    //referenceMonth: string,
   // referenceYear: string
}

export default function Home(){

    const [values, setValues] = useState({
        brand: '',
        model: '',
    })


   const [vehicleYearsOptions, setVehicleYearsOptions] = useState<number[]>([])
   const [vehicleYearFilter, setVehicleYearFilter] = useState('')

    type FuelType = {
        fuelTypeId: string;
        fuelTypeName: string;
    };
    const [fuelTypeFilter, setFuelTypeFilter] = useState('');
    const [fuelTypesOptions, setFuelTypesOptions] = useState<FuelType[]>([]);


    const filterValues = {
        fuelTypeFilter,
        vehicleYearFilter
    }

    const { brands, isLoading } = useBrands();
    const { models } = useModels(values.brand);
    const { vehicles } = useVehicles(filterValues, values.model)
 
    useEffect(() => {
        if (!vehicles) return 

        setFuelTypesOptions([...new Map(
            vehicles.map(vehicle => [
                vehicle.fuelTypeId,
            {
                fuelTypeId: vehicle.fuelTypeId,
                fuelTypeName: vehicle.fuelType.name
        }])).values()]);
        
    }, [vehicles])
    
    useEffect(() => {
        if (!vehicles) return
        setVehicleYearsOptions([... new Set(vehicles.map(vehicle => vehicle.vehicleYear))])
    }, [vehicles])


    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = event.target;

        switch (id){
            case 'fuelTypeId':
                setFuelTypeFilter(value);
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

        }
    }
    console.log("VEÍCULOS: ", vehicles)

    if (isLoading)
        { return(<p>carregando</p>)}
    else{ 
        return(
            <div className="bg-white h-dvh overflow-hidden">
                <Header/>
                <div className="flex flex-col justify-center items-center h-full overflow-hidden">
                    <Container classNameOp="flex flex-col gap-2">
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

                        <Select name="filters" id="fuelTypeId" placeholder={"Selecione um combustível..."} value={fuelTypeFilter} onChange={handleSelectChange}>
                        {
                                (fuelTypesOptions?.map((fuelTypesOption) => (
                                    <option value={fuelTypesOption.fuelTypeId} key={fuelTypesOption.fuelTypeId}>
                                         {fuelTypesOption.fuelTypeName}
                                    </option>
                                )))
                            }
                        </Select>
 
                        <Select name="filters" id="vehicleYear" placeholder={"Selecione o ano..."} value={vehicleYearFilter} onChange={handleSelectChange}>
                        {
                                (vehicleYearsOptions?.map((vehicleYearsOption) => (
                                    <option value={vehicleYearsOption} key={vehicleYearsOption}>
                                         {vehicleYearsOption}
                                    </option>
                                )))
                            }
                        </Select>

                        {/* <Select name="filters" id="referenceMonth" defaultValue={''} placeholder={"Selecione um mês de referência..."} value={filterValues.referenceMonth} onChange={handleSelectChange}>
                        {
                                (fuelTypes?.map((fuelType) => (
                                    <option value={fuelType.fuelTypeId} key={fuelType.fuelTypeId}>
                                        {fuelType.fuelTypeName}
                                    </option>
                                )))
                            }
                        </Select>

                        <Select name="filters" id="referenceYear" defaultValue={''} placeholder={"Selecione um combustível..."} value={filterValues.referenceYear} onChange={handleSelectChange}>
                        {
                                (fuelTypes?.map((fuelType) => (
                                    <option value={fuelType.fuelTypeId} key={fuelType.fuelTypeId}>
                                        {fuelType.fuelTypeName}
                                    </option>
                                )))
                            }
                        </Select> */}

                        <Button onClick={() => (handleSelectChange)} >
                            Pesquisar
                        </Button>
                    </Container>
                </div>
            </div>
    )
}
}