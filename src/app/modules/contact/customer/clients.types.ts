
export interface Customer {
    id:string;
    typeId: string;
    identificationTypeId: string;
    identificationType: IdentificationType;
    identification: string;
    source: string;
    email: string;
    firstName: string;
    companyName: string;
    lastName: string;
    address: string;
    address2: string;
    phone: string;
    phone2: string;
    project: string;
    neighborhoodName?: string;
}


export interface ClientPagination {
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}


export interface IdentificationType {
    id:        string;
    code:      string;
    name:      string;
    settingId: string;
    createdAt: string;
    updatedAt: string;
}
