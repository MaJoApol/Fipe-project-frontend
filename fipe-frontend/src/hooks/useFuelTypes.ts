
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useVehicles = (vehicles?: object) => {

   

    const {
        data: vehicles,
    } = useQuery<IVehicles[], Error>(['vehicles', modelId], getVehicles, {enabled: !!modelId, initialData: []}) 

    return {
        vehicles
    }
    
}

