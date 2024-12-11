import React from 'react';
import Colors from '../../Constants/Colors';
import type { IFooter } from '../../Interfaces/Components/IFooter';
import { Container, IconContainer, Text } from './styles';
import type { GestureResponderEvent } from 'react-native';

const Footer: React.FC<IFooter> = ({
    buttonPress,
    title,
    backgroundColor,
    textColor
}: IFooter) => (
    <Container
        onPress={buttonPress as (event: GestureResponderEvent) => void}
        backgroundColor={backgroundColor ?? Colors.primary}>
        <Text textColor={textColor ?? Colors.gray[100]}>{title}</Text>
    </Container>
);
export default Footer;
