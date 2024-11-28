import type { IUser } from './Entities/IUser';
import type { IRoutePayload } from './OutsideComponents/IRoutePayload';

export type ICompareImageReturnData = string;
export interface ISignInPayload extends Pick<IUser, 'email'> {
    password: string;
}

export type ISignInSendData = ISignInPayload;

export interface IGenericResponse<Data> {
    data: Data;
    message: string;
}

export interface ISignInReturnData extends IGenericResponse<IUser> {
    token: string;
}

export interface ISignUpPayload extends Partial<IUser> {
    name: string;
    cpf: string;
    phone: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ISignUpSendData {
    username: string;
    cpf: string;
    phone_number: string;
    date_of_birth: string;
    email: string;
    password: string;
}

export interface ISignUpReturnData extends Partial<IUser> {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
}
export interface IGetUnauthorizedAutocompletePayload {
    autocomplete_option: string[];
}

export interface IGetAuthorizedAutocompletePayload {
    autocomplete_option: string[];
    token: string;
}

export interface IAutocompleteSendData {
    autocomplete_option: string[];
}

export type ProductAutocomplete = {
    id: number;
    name: string;
    sku_id: string;
    brand: number;
};

export type ISignOutPayload = Pick<IRoutePayload, 'token'>;
