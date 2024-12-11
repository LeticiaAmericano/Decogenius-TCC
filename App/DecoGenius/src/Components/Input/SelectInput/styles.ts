import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import type {
    ISelectStyles
} from '../../../Interfaces/Components/Input/ISelectInput';
import Colors from '../../../Constants/Colors';

export const LabelText = styled.Text`
    color: ${Colors.primary};
    font-size: 16px;
    align-self: flex-start;
    width: 100%;
    margin-bottom: 6px;
    font-family: 'ChakraPetch-SemiBold';
`;

export const SelectContainer = styled.Pressable<ISelectStyles>`
    flex: 1;
    justify-content: ${(props: ISelectStyles) =>
        props.hideIcon ? 'flex-start' : 'space-between'};
    align-items: center;
    flex-direction: row;
    padding: 4px;
    background-color: ${(props: ISelectStyles) =>
        props.backgroundColor ?? Colors.gray[200]};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: ${(props: ISelectStyles) =>
        props.isOpened || props.flatBottomBorder ? 5 : 5}px;
    border-bottom-right-radius: ${(props: ISelectStyles) =>
        props.isOpened || props.flatBottomBorder ? 5 : 5}px;
    border-bottom-color: ${(props: ISelectStyles) =>
        props.isOpened ? Colors.gray[200] : 'transparent'};
    border-bottom-width: ${(props: ISelectStyles) =>
        props.isOpened ? 1 : 0}px;
`;

export const SelectText = styled.Text`
    font-size: 16px;
    flex: 1;
    color: ${Colors.primary};
    text-align: left;
    font-family: 'ChakraPetch-Regular';
    padding-left: 5px;
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
    color: ${Colors.red[500]};
`;
