import type { FormikErrors, FormikHandlers } from 'formik';
import type { ISignUpPayload } from '../Routes';
export interface IFormikInputs extends Pick<FormikHandlers, 'handleChange'> {
    values: ISignUpPayload;
    errors: FormikErrors<ISignUpPayload>;
}

export interface ISimpleInputContainer {
    width?: string;
    paddingTop?: number;
}

export interface IContainerInputEditableWidth {
    width: string;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
}

export interface ILabelText {
    labelColor?: string;
    fontSize: number;
}

export interface ISignUpForm extends IFormikInputs {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}
