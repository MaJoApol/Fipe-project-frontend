
export interface IBrands{
   
        id: string;
        name: string;
        fipeCode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
        createdById: string | null;
        updatedById: string | null;
        deletedById: string | null;
    
};

