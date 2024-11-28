import type { GestureResponderEvent } from 'react-native';

export interface ISimpleButton {
    placeholderName: string;
    onPress:
        | ((event: GestureResponderEvent) => void)
        | ((event?: React.FormEvent<HTMLFormElement>) => void)
        | undefined;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    loading?: boolean;
    colorText?: string;
    borderRadius?: boolean;
}

export interface IContainer {
    borderColor: string;
    backgroundColor?: string;
    borderRadius?: boolean;
}

export interface IText {
    color: string;
}
