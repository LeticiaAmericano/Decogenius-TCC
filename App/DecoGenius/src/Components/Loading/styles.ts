import type { ImageStyle } from 'react-native';
import Colors from '../../Constants/Colors';
import { ExternalStylingLibrary as styled} from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const Container = styled.View`
    width: 100%;
    height:100%;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.gray[100]};
`;

export const MainContainer = styled.View`
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const StyledImageLogo = styled.Image<ImageStyle>`
    max-width: 250px;
    max-height: 250px;
    margin-top: 10%;
`;

export const Title = styled.Text`
    font-family: 'ChakraPetch-SemiBold';
    font-size: 40px;
    color: ${Colors.primary};
`;