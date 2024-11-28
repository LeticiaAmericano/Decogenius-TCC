import type { GestureResponderEvent } from 'react-native';

export interface IFooter {
    buttonPress:
        | ((event: GestureResponderEvent) => void)
        | ((event?: React.FormEvent<HTMLFormElement>) => void)
        | undefined;
    title: string;
    icon?: { name: string; family: string };
    backgroundColor?: string;
    textColor?: string;
}

export interface IContainerFooter {
    backgroundColor: string;
}

export interface ITextFooter {
    textColor: string;
}

export default IFooter;
