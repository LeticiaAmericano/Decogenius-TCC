// Libs
import { ExternalResponsiveFontSize } from '../../../Libs/ExternalResponsiveFontSize';
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// interfaces
import type {
    ILabelText,
    ISelectStyles
} from '../../../Interfaces/Components/Input/ISelectInput';

// constants
import Colors from '../../../Constants/Colors';

export const LabelText = styled.Text<ILabelText>`
    color: ${(props: ILabelText) => props.labelColor ?? Colors.black};
    font-size: ${(props: ILabelText) =>
        ExternalResponsiveFontSize.percentage(props.fontSize) ??
        ExternalResponsiveFontSize.percentage(3)}px;
    align-self: flex-start;
    width: 100%;
`;

export const SelectContainer = styled.Pressable<ISelectStyles>`
    flex: 1;
    justify-content: ${(props: ISelectStyles) =>
        props.hideIcon ? 'flex-start' : 'space-between'};
    align-items: center;
    flex-direction: row;
    padding: 4px;
    background-color: ${(props: ISelectStyles) =>
        props.backgroundColor ?? Colors.blue};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: ${(props: ISelectStyles) =>
        props.isOpened || props.flatBottomBorder ? 0 : 5}px;
    border-bottom-right-radius: ${(props: ISelectStyles) =>
        props.isOpened || props.flatBottomBorder ? 0 : 5}px;
    border-bottom-color: ${(props: ISelectStyles) =>
        props.isOpened ? Colors.gray : 'transparent'};
    border-bottom-width: ${(props: ISelectStyles) =>
        props.isOpened ? 1 : 0}px;
`;

export const SelectText = styled.Text<ISelectStyles>`
    font-size: 18px;
    flex: 1;
    color: ${(props: ISelectStyles) => props.labelColor ?? Colors.blueOcean};
    text-align: ${(props: ISelectStyles) => props.align ?? 'left'};
`;

export const SelectModalContainer = styled.Pressable`
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: flex-end;
`;

export const OptionsContainer = styled.View`
    max-height: 50%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    justify-content: flex-end;
    overflow: hidden;
`;

export const ContainerError = styled.View`
    width: 100%;
`;

export const ErroText = styled.Text`
    color: ${Colors.warning};
`;
