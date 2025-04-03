'use client'
import Button from "@/components/buttons";
import Container from "@/components/container";
import Header from "@/components/header";
import { Select } from "@/components/select";

import Title from "@/components/titles";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";
import { useVehicles } from "@/hooks/useVehicles";
import { useState } from "react";

export default function Home(){
  
    const [values, setValues] = useState({
        brand: '',
        model: '',
        fuelType: '',
    })
    const { brands, isLoading } = useBrands();
    const { models } = useModels(values.brand);
    const { vehicles } = useVehicles(values.model)
 
    const fuelTypes = vehicles?.length ? [...new Map( // retorna valores unicos
        vehicles.map(vehicle => [
            vehicle.fuelTypeId,
            {
                fuelTypeId: vehicle.fuelTypeId,
                fuelTypeName: vehicle.fuelType.name
            }
        ])
    ).values()] : [];

    console.log(fuelTypes)

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setValues({...values, [event.target.id]: event.target.value})
    }

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

                        <Select id="brand" defaultValue={''} placeholder={"Selecione uma marca..."} value={values.brand} onChange={handleSelectChange}>
                            {!isLoading  &&
                                (brands?.map((brand) => (
                                    <option value={brand.id} key={brand.id}>
                                        {brand.name}
                                    </option>
                                )))
                            }
                        </Select>
                        
                        <Select id="model" defaultValue={''} placeholder={"Selecione um modelo..."} value={values.model} onChange={handleSelectChange}>
                            {!isLoading  &&
                                (models?.map((model) => (
                                    <option value={model.id} key={model.id}>
                                        {model.name}
                                    </option>
                                )))
                            }
                        </Select>

                        <Select id="fuelType" defaultValue={''} placeholder={"Selecione um combustível..."} value={values.fuelType} onChange={handleSelectChange}>
                        {!isLoading  &&
                                (fuelTypes?.map((fuelType) => (
                                    <option value={fuelType.fuelTypeId} key={fuelType.fuelTypeId}>
                                        {fuelType.fuelTypeName}
                                    </option>
                                )))
                            }
                        </Select>

                        <Select name="" id="" >
                            <option value="A" defaultValue={"Selecione uma combustível..."}></option>
                        </Select>

                        <Button>
                            Pesquisar
                        </Button>
                    </Container>
                </div>
            </div>
    )
}
}