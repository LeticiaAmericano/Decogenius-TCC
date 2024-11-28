import type { FormikHandlers, FormikHelpers, FormikState } from 'formik';

import type { IPatientData } from '../Entities/IPatient';

export interface IResetForm {
    resetForm: () => void;
}

export interface IDefaultFormProps<T>
    extends FormikState<T>,
        FormikHandlers,
        FormikHelpers<T> {}

export type ICreatePatientFormikValues = IPatientData;
