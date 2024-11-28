// Interfaces
import type { IUser } from '../Entities/IUser';
import type { ISignInSendData, ISignUpPayload } from '../Routes';

export interface IAuthContext {
    signIn: (values: ISignInSendData) => Promise<boolean>;
    logout: () => void;
    signUp: (values: ISignUpPayload) => Promise<boolean>;
    user: IUser;
}

export interface IConfigContext {
    screenWidth: number;
}
