
export interface IFuelTypes{
    name: string;
    id: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    createdById: string | null;
    updatedById: string | null;
    deletedById: string | null;
    abbreviation: string;
}