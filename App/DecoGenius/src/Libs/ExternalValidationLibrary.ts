import * as Yup from 'yup';
import { IExternalValidationLibrary } from './ExternalValidationLibrary/Interfaces/IExternalValidationLibrary';

export const ExternalValidationLibrary: IExternalValidationLibrary = {
    string: () => Yup.string(),
    number: () => Yup.number(),
    boolean: () => Yup.boolean(),
    array: () => Yup.array(),
    object: () => Yup.object(),
    date: () => Yup.date(),
    ref: (path: string): Yup.Reference => Yup.ref(path),
    isTrue: (schema: Yup.BooleanSchema, errorMessage: string) =>
        schema.isTrue(errorMessage),
    label: (schema: Yup.Schema, label: string) => schema.label(label),
    required: (schema: Yup.AnySchema, errorMessage: string) =>
        schema.required(errorMessage),
    email: (schema: Yup.StringSchema, errorMessage: string) =>
        schema.email(errorMessage),
    min: (schema: Yup.StringSchema, minValue: number, errorMessage: string) =>
        schema.min(minValue, errorMessage),
    max: (schema: Yup.StringSchema, maxValue: number, errorMessage: string) =>
        schema.max(maxValue, errorMessage),
    shape: (
        schema: Yup.ObjectSchema<Yup.ObjectShape>,
        additions: Yup.ObjectShape,
        excludes?: [string, string][]
    ) => schema.shape(additions, excludes),
    nullable: (schema: Yup.Schema) => schema.nullable(),
    equals: <TEqualsArgumentType>(
        schema: Yup.Schema,
        enums: Array<TEqualsArgumentType>,
        errorMessage: string
    ) => schema.equals(enums, errorMessage),
    test: (
        schema: Yup.Schema,
        name: string,
        errorMessage: string,
        validationFunction: () => boolean | Promise<boolean>
    ) => schema.test(name, errorMessage, validationFunction)
};
