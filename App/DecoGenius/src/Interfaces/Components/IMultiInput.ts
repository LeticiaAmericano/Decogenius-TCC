import type { ListRenderItemInfo } from 'react-native';
import type { ISimpleInput } from './Input/ISimpleInput';

export interface IMultiInputProps
    extends Omit<ISimpleInput, 'value' | 'onChangeText'> {
    values: string[];
    setValues: (values: string[]) => void;
}

export interface IStyledListComponentProps {
    index: number;
}

export interface IStyledListValue {
    textColor: string;
}

export interface IStyledListContainerProps {
    backgroundColor: string;
}

export interface IListItemProps
    extends Omit<ListRenderItemInfo<string>, 'separators'> {
    handleRemoveValue: (index: number) => void;
    editable?: boolean;
    textColor?: string;
}
