import React from 'react';
import Colors from '../../../Constants/Colors';
import {
    IconsConstants,
    IconSizes,
    IconsTypes
} from '../../../Libs/ExternalIconsLibrary';
import Icon from '../../Icon';
import type { ITemplateModalProps } from '../../../Interfaces/Components/Modal/ITemplateModal';
import {
    CloseButtonText,
    CloseFooterButton,
    Divider,
    FooterContainer,
    HeaderContainer,
    ModalBody,
    ModalCloseButton,
    ModalContainer,
    ModalContainerInner,
    TitleContainer
} from './styles';

const TemplateModal: React.FC<ITemplateModalProps> = ({
    title,
    visible,
    setVisible,
    children,
    footer,
    titleColor,
    dividerColor,
    closeIcon,
    ...props
}: ITemplateModalProps): JSX.Element | null => {
    if (!visible) return null;

    return (
        <ModalContainer>
            <ModalContainerInner fullScreen={props.fullScreen}>
                {closeIcon && (
                    <ModalCloseButton onPress={() => setVisible(!visible)}>
                        <Icon
                            color={Colors.primary}
                            name={IconsConstants.fontAwesome.close}
                            iconFamily={IconsTypes.fontAwesome}
                            size={IconSizes.extraSmall}
                        />
                    </ModalCloseButton>
                )}
                <HeaderContainer>
                    <TitleContainer numberOfLines={1} titleColor={titleColor}>
                        {title}
                    </TitleContainer>
                </HeaderContainer>
                <Divider dividerColor={dividerColor} />
                <ModalBody>{children ?? null}</ModalBody>
                {footer && <FooterContainer>{footer}</FooterContainer>}
                {props.defaultFooter && (
                    <CloseFooterButton onPress={() => setVisible(!visible)}>
                        <CloseButtonText>
                            {'Close'}
                        </CloseButtonText>
                    </CloseFooterButton>
                )}
            </ModalContainerInner>
        </ModalContainer>
    );
};

export default TemplateModal;
