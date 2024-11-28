import React from 'react';
import Colors from '../../Constants/Colors';
import type { IFooter } from '../../Interfaces/Components/IFooter';
import { IconSizes } from '../../Libs/ExternalIconsLibrary';
import Icon from '../Icon';
import { Container, IconContainer, Text } from './styles';
import type { GestureResponderEvent } from 'react-native';

const Footer: React.FC<IFooter> = ({
    buttonPress,
    title,
    icon,
    backgroundColor,
    textColor
}: IFooter) => (
    <Container
        onPress={buttonPress as (event: GestureResponderEvent) => void}
        backgroundColor={backgroundColor ?? Colors.primary}>
        {icon && (
            <IconContainer>
                <Icon
                    name={icon.name}
                    iconFamily={icon.family}
                    color={Colors.gray[100]}
                    size={IconSizes.large}
                />
            </IconContainer>
        )}
        <Text textColor={textColor ?? Colors.gray[100]}>{title}</Text>
    </Container>
);
export default Footer;
