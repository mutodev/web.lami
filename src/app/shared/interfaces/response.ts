
export declare type STATUS = 'success' | 'warning' | 'error' | 'info';

export interface APIResponse<T> {
    status: STATUS;
    message: string;
    icon: string;
    data: T;
}