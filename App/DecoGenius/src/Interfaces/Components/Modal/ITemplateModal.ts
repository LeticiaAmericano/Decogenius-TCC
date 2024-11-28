import type { ReactNode } from 'react';

export interface ITemplateModalProps {
    title: string;
    description?: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    children?: ReactNode;
    fullScreen?: boolean;
    position?: 'center' | 'top';
    defaultFooter?: boolean;
    footer?: ReactNode;
    titleColor?: string;
    dividerColor?: string;
    closeIcon?: boolean;
}

export interface IDivider {
    dividerColor?: string;
}

export interface ITitleContainer {
    titleColor?: string;
}

export interface IModalContainerInner {
    fullScreen?: boolean;
}
