import { FilterTypes } from "@/app/(main)/page";
import { IVehicles } from "@/interface/IVehicles";
import { http } from "@/lib/http-common";
import { useQuery } from 'react-query';

export const useVehicles = ( modelId?: string, filterValues?: FilterTypes ) => {

    if (filterValues?.vehicleYearFilter) {
        filterValues.vehicleYearFilter = Number(filterValues?.vehicleYearFilter)
    }
   
    const getAllVehicles = async(): Promise<IVehicles[]> => {
        if (!modelId) return []
        if (
            filterValues?.vehicleYearFilter !== 0 ||
            filterValues?.fuelTypeIdFilter !== ''
        )
        {
            const {data} = await http.post(`/vehicles/get/${modelId}`, filterValues)
            return data.vehicles
        }
        else{
            return []
        }
    }

    const {
        data: vehiclesResponse,
    } = useQuery<IVehicles[], Error>(['vehicles', modelId, filterValues], getAllVehicles, {enabled: !!modelId , initialData: []}) 

    return {
        vehiclesResponse
    }
}
