import type * as Yup from 'yup';

export interface IExternalValidationLibrary {
    string: () => Yup.StringSchema;
    number: () => Yup.NumberSchema;
    boolean: () => Yup.BooleanSchema;
    array: () => Yup.ArraySchema<
        unknown[] | undefined,
        Yup.AnyObject,
        undefined,
        ''
    >;
    object: () => Yup.ObjectSchema<
        {
            [x: string]: unknown;
        },
        Yup.AnyObject,
        {
            [x: string]: undefined;
        },
        ''
    >;
    date: () => Yup.DateSchema;
    ref: (path: string) => Yup.Reference;
    isTrue: (
        schema: Yup.BooleanSchema,
        errorMessage: string
    ) => Yup.BooleanSchema<true | undefined, Yup.AnyObject, '', ''>;
    label: (schema: Yup.Schema, label: string) => Yup.Schema;
    required: (schema: Yup.Schema, errorMessage: string) => Yup.Schema;
    email: (schema: Yup.StringSchema, errorMessage: string) => Yup.StringSchema;
    min: (
        schema: Yup.StringSchema,
        minValue: number,
        errorMessage: string
    ) => Yup.StringSchema;
    max: (
        schema: Yup.StringSchema,
        maxValue: number,
        errorMessage: string
    ) => Yup.StringSchema;
    shape: (
        schema: Yup.ObjectSchema<Yup.ObjectShape>,
        additions: Yup.ObjectShape,
        excludes?: [string, string][]
    ) => Yup.ObjectSchema<
        {
            [x: string]: unknown;
        },
        Yup.AnyObject,
        unknown,
        ''
    >;
    nullable: (schema: Yup.Schema) => Yup.Schema;
    equals: <TEqualsArgumentType>(
        schema: Yup.Schema,
        enums: Array<TEqualsArgumentType>,
        errorMessage: string
    ) => Yup.Schema;
    test: (
        schema: Yup.Schema,
        name: string,
        errorMessage: string,
        validationFunction: () => boolean | Promise<boolean>
    ) => Yup.Schema;
}
