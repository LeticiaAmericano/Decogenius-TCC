import Colors from '../../../../Constants/Colors';
import { ExternalStylingLibrary as styled } from '../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const Divider = styled.View`
    height: 2px;
    background-color: ${Colors.lightGray};
    width: 90%;
    margin: 0 auto;
`;

export const MenuTrigger = styled.TouchableOpacity``;

export const MenuOption = styled.TouchableOpacity`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const MenuOptionText = styled.Text`
    margin-left: 10px;
    color: ${Colors.blueOcean};
    font-size: 16px;
`;

export const MenuContainer = styled.View`
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 1;
    display: flex;
    width: 180px;
    border-radius: 10px;
    background-color: ${Colors.white};
`;
