import type { PropsWithChildren } from 'react';

export interface ICollapseProps extends PropsWithChildren {
    title: string;
    titleFontSize?: string;
    titleColor?: string;
    containerPadding?: number;
    defaultOpen?: boolean;
}

export type CollapseTextProps = {
    fontSize?: string;
    color?: string;
};

export type ContainerProps = {
    padding?: number;
};
