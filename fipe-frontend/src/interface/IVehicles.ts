
export interface IVehicles{
    id: string
    fipeCode: string | null
    value: number
    referenceMonth: number
    referenceYear: number
    vehicleYear: number
    modelId: string
    fuelTypeId: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    createdById: string | null
    updatedById: string | null
    deletedById: string | null
    fuelType: {
        name: string;
      };
}