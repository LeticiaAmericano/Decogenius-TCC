import type { Dispatch, SetStateAction } from 'react';

export interface IErrorModalState {
    visibility: boolean;
    modalBody: string;
    modalErrorStackTrace?: string;
}

export interface IErrorModal {
    errorModalState: IErrorModalState;
    setErrorModalState: Dispatch<SetStateAction<IErrorModalState>>;
}
