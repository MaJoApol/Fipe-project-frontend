
import { IVehicles } from "@/interface/IVehicles";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useVehicles = (modelId?: string, filterValues?: object) => {

   
    const getVehicles = async(): Promise<IVehicles[]> => {
        if (!modelId) return []
        const {data} = filterValues ? await http.get(`/vehicles/get/${modelId}`, filterValues) : await http.get(`/vehicles/get/${modelId}`)
        return data
    }

    const {
        data: vehicles,
    } = useQuery<IVehicles[], Error>(['vehicles', modelId], getVehicles, {enabled: !!modelId, initialData: []}) 

    return {
        vehicles
    }
    
}

