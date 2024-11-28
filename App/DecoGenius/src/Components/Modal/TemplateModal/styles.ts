import Colors from '../../../Constants/Colors';
import type {
    IDivider,
    IModalContainerInner,
    ITitleContainer
} from '../../../Interfaces/Components/Modal/ITemplateModal';
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const ModalContainer = styled.View`
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const Divider = styled.View<IDivider>`
    height: 5px;
    background-color: ${(props: IDivider) =>
        props.dividerColor ? props.dividerColor : Colors.primary};
    border-radius: 2px;
    align-self: center;
    width: 90%;
`;

export const ModalContainerInner = styled.View<IModalContainerInner>`
    background-color: ${Colors.gray[100]};
    padding-bottom: 10px;
    border-radius: 8px;

    ${(props: IModalContainerInner) =>
        props.fullScreen
            ? `
    width: 100%;
    height: 100%;
    border-radius: 0px;
`
            : `
    width: 80%;
    margin: 0 auto;
    max-height: 80%;
    overflow: hidden;
`}
`;

export const ModalCloseButton = styled.Pressable`
    margin: 5px 0 0 5px;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export const TitleContainer = styled.Text<ITitleContainer>`
    font-size: 20px;
    font-family: 'ChakraPetch-SemiBold';
    color: ${(props: ITitleContainer) => props.titleColor ?? Colors.primary};
    max-width: 90%;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background-color: ${Colors.gray[100]};
    justify-content: center;
    align-items: center;
`;

export const CloseButtonText = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
    font-family: 'ChakraPetch-SemiBold';
    color: ${Colors.gray[100]};
`;

export const FooterContainer = styled.View`
    padding: 16px;
`;

interface ICloseFooterButton {
    color?: string;
}

export const CloseFooterButton = styled.TouchableOpacity<ICloseFooterButton>`
    background-color: ${(props: ICloseFooterButton) =>
        props.color ?? Colors.primary};
    padding: 15px;
    border-radius: 5px;
    align-items: center;
    align-self: flex-end;
    width: 100%;
`;

export const ModalBody = styled.ScrollView`
    padding: 0 16px;
`;
