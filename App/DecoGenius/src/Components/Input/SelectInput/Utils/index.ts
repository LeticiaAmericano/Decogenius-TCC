// interfaces
import type { ISelectOption } from '../../../../Interfaces/Components/Input/ISelectInput';

export const findOption: <TValue>(
    options: ISelectOption<TValue>[],
    value: string | undefined
) => ISelectOption<TValue> | undefined = <TValue>(
    options: ISelectOption<TValue>[],
    value: string | undefined
): ISelectOption<TValue> | undefined => {
    if (value === null) return undefined;
    return options.find(
        (option: ISelectOption<TValue>) => option.value === value
    );
};
