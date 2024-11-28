import type { Dispatch, SetStateAction } from 'react';

export interface IConfirmationModalState<
    TConfirmationAction extends (...args: unknown[]) => unknown
> {
    visibility: boolean;
    action: TConfirmationAction;
}

export interface IConfirmationModal<
    TConfirmationAction extends (...args: unknown[]) => unknown
> {
    confirmationModalState: IConfirmationModalState<TConfirmationAction>;
    setConfirmationModalState: Dispatch<
        SetStateAction<IConfirmationModalState<TConfirmationAction>>
    >;
}
