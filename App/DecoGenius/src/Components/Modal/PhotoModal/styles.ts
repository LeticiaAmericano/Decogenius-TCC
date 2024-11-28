import Colors from '../../../Constants/Colors';
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const ModalContainer = styled.View`
    position: absolute;
    background-color: ${Colors.backgroundModal};
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const BackgroundImageContainer = styled.ImageBackground`
    height: 100%;
    width: 100%;
    background-color: ${Colors.black};
`;

export const ModalInnerContainer = styled.View`
    position: absolute;
    width: 100%;
    justify-content: space-between;
    height: 100%;
`;

export const ModalCloseButton = styled.Pressable`
    margin: 5px 0 0 5px;
`;

export const IconsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
`;

export const TouchableIconContainer = styled.TouchableOpacity``;
