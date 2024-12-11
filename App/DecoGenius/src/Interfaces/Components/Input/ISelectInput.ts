export interface ISelectOption<TValue> {
    value: TValue;
    label: string;
}

export interface IProductsSelectOption extends ISelectOption<string> {
    brand: number;
}

export interface ISelectStyles {
    backgroundColor?: string | undefined;
    labelColor?: string;
    optionColor?: string;
    isOpened?: boolean;
    align?: 'left' | 'center';
    hideIcon?: boolean;
    flatBottomBorder?: boolean;
}

export type SelectRenderProps<TValue> = {
    item: ISelectOption<TValue>;
};

export interface ISelectInputProps<TValue> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    opened?: boolean;
    labelOption?: ISelectOption<TValue>;
    setSelectValue: (selectedValue: TValue) => void;
    defaultValue?: string | undefined;
    options: ISelectOption<TValue>[];
    styles?: ISelectStyles;
    textAlign?: 'left' | 'center';
    hideIcon?: boolean;
    flatBottomBorder?: boolean;
    errorMessage?: string;
}

export interface IRenderSelectOption<TValue> {
    option: ISelectOption<TValue>;
    backgroundColor?: string | undefined;
    handlePress: (value: ISelectOption<TValue>) => void;
}

export interface SelectOptionContainerProps {
    backgroundColor?: string;
}

export interface IStyledContainerTextProps {
    mainColor?: string;
    straightBottomBorderRadius?: boolean;
}
