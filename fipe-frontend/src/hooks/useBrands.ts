import { IBrands } from "@/interface/IBrands";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useBrands = () => {

    const getBrands = async(): Promise<IBrands[]> => {
        const {data} =  await http.get(`/brands/get`)
        return data.brands
    }

    const {
        data: brands,
        isLoading,
    } = useQuery<IBrands[], Error>('brands', getBrands) 

    return {brands, isLoading}
    
}

