export interface IUser {
    id: number;
    email: string;
    username: string;
    is_verify: boolean;
    is_allowed_login: boolean;
    token: string;
}
