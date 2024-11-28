import type { KeyboardTypeOptions } from 'react-native';

export interface ITemplateInput {
    labelText?: string;
    labelColor?: string;
    iconName?: string;
    onChangeText?: (text: string) => void;
    errorMessage?: string;
    required?: boolean;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    textColor?: string;
    mainColor?: string;
    isTypePassword?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    editable?: boolean;
    onIconPress?: () => void;
    straightBottomBorderRadius?: boolean;
    autoCorrect?: boolean;
}

export interface ILabelText {
    labelColor?: string;
    fontSize: number;
    width: string;
}

export interface IContainerText {
    mainColor?: string;
}

export interface IInputText {
    textColor?: string;
    hasError: boolean;
    hasIcon: boolean;
    width: string;
}

export interface IContainerIcon {
    width: string;
}
