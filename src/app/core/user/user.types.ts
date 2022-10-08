export interface User {
    id:        string;
    userName:  string;
    firstName: string;
    lastName:  string;
    email:     string;
    phone:     string;
    avatar?:     string;
    role:      string;
    active:    boolean;
    createdAt: string;
    updatedAt: string;
}
