export interface ClientModel {
    id: string;
    indentification_number: string;
    name: string;
    phone: string;
    active: boolean;
}

export interface ClientPagination {
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}