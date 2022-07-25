export interface AuthResponse{
    access_token?: string;
    token_type?: string;
    message?:string;
}
export interface User{
    id?: string;
    role_id?:  number;
    first_name?:  string;
    last_name?: string;
    email?:  string;
    email_verified_at?:  string;
    created_at?:  string;
    updated_at?:  string;
    role_name?:string;
}

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: any;
    category?: string;
    image?: string;
    rating?: number;
}
