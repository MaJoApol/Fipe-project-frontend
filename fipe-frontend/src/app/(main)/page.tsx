'use client'
import Button from "@/components/buttons";
import Container from "@/components/container";
import Header from "@/components/header";
import Select from "@/components/select";
import Title from "@/components/titles";
import { useBrands } from "@/hooks/useBrands";

export default function Home(){
  
    const { brands, isLoading } = useBrands();
    console.log(brands)
    if (isLoading){
        return(
            <p>carrgando</p>
        )
    }
    else{ 
    return(
        <div className="bg-white h-dvh overflow-hidden">
            <Header/>
            <div className="flex flex-col justify-center items-center h-full overflow-hidden">
                <Container classNameOp="flex flex-col gap-2">
                    <Title variant="title">
                        Consultar tabela Fipe
                    </Title>

                    <Select name="" id="">
                        <option value="A" defaultValue={"Selecione uma marca..."}></option>
                        {!isLoading  &&
                            (brands?.map((brand) => (
                                <option value={brand.id} key={brand.id}>
                                    {brand.name}
                                </option>
                            )))
                        }
                    </Select>

                    <Select name="" id="" className="border border-1">
                        <option value="A" defaultValue={"Selecione um modelo..."}></option>
                    </Select>

                    <Select name="" id="" className="border border-1">
                        <option value="A" defaultValue={"Selecione o ano..."}></option>
                    </Select>

                    <Select name="" id="" className="border border-1">
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