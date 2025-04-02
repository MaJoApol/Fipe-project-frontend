import { IModels } from "@/interface/IModels";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useModels = () => {

    const getModels = async(): Promise<IModels[]> => {
        const {data} =  await http.get(`/models/get`)
        return data.models
    }

    const {
        data: models,
        isLoading,
    } = useQuery<IModels[], Error>('models', getModels) 

    return {models, isLoading}
    
}

