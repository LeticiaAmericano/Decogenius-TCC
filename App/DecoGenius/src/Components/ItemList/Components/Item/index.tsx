import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Colors from '../../../../Constants/Colors';
import type { IItem } from '../../Interfaces/IItem';
import { Container, ItemContainer, ItemText, PhotoCard, PhotoContainer, SubItemText } from './styles';

const Item: React.FC<IItem> = ({
    backgroundColor = Colors.gray[100],
    value,
    navigationScreen,
    color= Colors.gray[100],
}: IItem) => {
    const navigate = useNavigation();

    const ItemOnPress: () => void = () => {
        if (navigationScreen)  {
            navigate.navigate(navigationScreen, value);
        }
        return;
    };

    const DisplayBase64Image = (base64: string): string => {
        return `data:image/png;base64,${base64}`;
    };

    return (
        <Container backgroundColor={backgroundColor} onPress={ItemOnPress}>
            <PhotoContainer>
                <PhotoCard source={{ uri: DisplayBase64Image(value.gpt_photo) }}/>
            </PhotoContainer>
            <ItemContainer>
                <ItemText color={color}>{value.name}</ItemText>
                <SubItemText color={color}>{value.room}</SubItemText>
            </ItemContainer>
        </Container>
    );
};

export default Item;
