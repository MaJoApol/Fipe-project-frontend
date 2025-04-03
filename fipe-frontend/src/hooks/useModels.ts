import { IModels } from "@/interface/IModels";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useModels = (brandId?: string) => {

   
    const getModels = async(): Promise<IModels[]> => {
        if (!brandId) return []
        const {data} =  await http.get(`/models/get/${brandId}`)
        return data.models
    }

    const {
        data: models,
    } = useQuery<IModels[], Error>(['models', brandId], getModels, {enabled: !!brandId, initialData: []}) 

    return {
        models,

    }
    
}

