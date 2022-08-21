export interface AuthResponse{
    access_token?: string;
    token_type?: string;
    message?:string;
}
export interface User{
    id?: string;
    role_id?:  string;
    first_name?:  string;
    last_name?: string;
    email?:  string;
    email_verified_at?:  string;
    created_date?:  string;
    updated_at?:  string;
    role_name?:string;
    password?:string;
}
