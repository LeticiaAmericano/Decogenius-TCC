import type { ReactNode } from 'react';

export interface ITemplateItem {
    handlePress?: () => void;
    handleLongPress?: () => void;
    children: ReactNode;
    backgroundColor?: string;
    margin?: number;
}

export interface ContainerItemProps {
    backgroundColor?: string;
    margin: number;
}
