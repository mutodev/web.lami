export interface User {
    _id:              string;
    photo:            Photo;
    reset_password:   boolean;
    email:            string;
    first_name:       string;
    last_name:        string;
    profile:          string;
    active:           boolean;
    seller_id:        string;
    seller_code:      string;
    city:             string;
    operation_center: string;
    stall:            string;
    state:            string;
    updatedAt:        string;
    reset_token:      string;
    user_name:        string;
}

export interface Photo {
    Location: string;
    Key:      string;
}


export const ROLE = [
    'Super Administrador',
    'Lider Comercial',
    'Vendedor/Comercial',
    'Caja',
    'Coordinador Logistica',
    'Conductor'
];


