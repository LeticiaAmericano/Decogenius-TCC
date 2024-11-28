// Libs
import { ExternalStylingLibrary as styled } from '../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../../Constants/Colors';
import type { IContainerItem, IItemTextItem } from '../../Interfaces/IItem';

export const Container = styled.TouchableOpacity<IContainerItem>`
    width: 100%;
    border-radius: 5px;
    background-color: ${Colors.gray[200]};
    flex-direction: row;
    margin-bottom: 5px;
    height: 70px;
`;

export const ItemText = styled.Text<IItemTextItem>`
    color: ${Colors.primary};
    font-size: 16px;
    font-family: 'ChakraPetch-Regular';
`;

export const SubItemText = styled.Text<IItemTextItem>`
    color: ${Colors.primary};
    font-size: 12px;
    font-family: 'ChakraPetch-Regular';
`;

export const PhotoCard = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 5px;
`;

export const PhotoContainer = styled.View`
    width: 25%;
    align-items: center;
    justify-content: center;
`;

export const ItemContainer = styled.View`
    width: 75%;
    justify-content: center;
`;