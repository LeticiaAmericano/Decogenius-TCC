import type { ListRenderItemInfo } from 'react-native';
import type { ISelectOption } from './Input/ISelectInput';
import type { ITemplateInput } from './Input/ITemplateInput';

export interface IMultSelectInputProps<Tvalue>
    extends Omit<ITemplateInput, 'value' | 'onChangeText'> {
    labelText: string;
    options: ISelectOption<Tvalue>[];
    selectedOptions: ISelectOption<Tvalue>[];
    setSelectedOptionsState: (value: ISelectOption<string>[]) => void;
    height?: number;
    externalSelectOptionHandler?: (value: ISelectOption<string>[]) => void;
    errorMessages?: {
        selectError: string | undefined;
        multError: string | undefined;
    };
    isView?: boolean;
}

export interface IMultSelectInputStyleProps {
    height?: number;
    backgroundColor?: string;
}

export interface IListItemProps
    extends Omit<ListRenderItemInfo<string>, 'separators'> {
    handleRemoveValue: (index: number) => void;
    editable?: boolean;
    textColor?: string;
}

export interface IStyledListComponentProps {
    backgroundColor?: string;
    height?: number;
    index?: number;
}

export interface IStyledListValueProps {
    textColor?: string;
}
