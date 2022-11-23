export interface User {
    authenticated: boolean;
    email: string;
    password: string;
    name?: string;
}