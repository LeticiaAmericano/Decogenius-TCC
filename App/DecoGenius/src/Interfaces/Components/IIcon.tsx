export interface IIcon {
    iconFamily: string;
    name: string;
    color?: string;
    size?: 'large' | 'medium' | 'small' | 'extra small';
}

export type TIcon = {
    iconFamily: string;
    iconName: string;
};

export interface IIconComponentProps {
    iconFontSize: number;
    color?: string;
}
