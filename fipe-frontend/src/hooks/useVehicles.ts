
import { FilterTypes } from "@/app/(main)/page";
import { IVehicles } from "@/interface/IVehicles";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useVehicles = (filterValues: FilterTypes, modelId?: string) => {

    if (filterValues.vehicleYearFilter) {
        filterValues.vehicleYearFilter = Number(filterValues.vehicleYearFilter)
    }

   //const filterIsEmpty = Object.values(filterValues).every(value => value === '')
  
   
    const getVehicles = async(): Promise<IVehicles[]> => {
        if (!modelId) return []
        const {data} = await http.post(`/vehicles/get/${modelId}`, filterValues)
        return data.vehicles
    }

    const {
        data: vehicles,
    } = useQuery<IVehicles[], Error>(['vehicles', modelId, filterValues], getVehicles, {enabled: !!modelId , initialData: []}) 

    return {
        vehicles
    }
    
}



// filterIsEmpty ? await http.get(`/vehicles/get/${modelId}`) : await http.post(`/vehicles/get/${modelId}`, filterValues)