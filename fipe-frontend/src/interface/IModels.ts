
export interface IModels{
   
    name: string;
    id: string;
    fipeCode: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    createdById: string | null;
    updatedById: string | null;
    deletedById: string | null;
    brandId: string;

};

