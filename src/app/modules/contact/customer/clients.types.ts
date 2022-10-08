
export interface Customer {
    type: string;
    identificationType: string;
    identification: string;
    source: string;
    email: string;
    firstName: string;
    companyName: string;
    lastName: string;
    address: string;
    phone: string;
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
