import Colors from '../../Constants/Colors';
import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const Container = styled.View`
    width: 100%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${Colors.primary};
    z-index: 1;
`;

export const Text = styled.Text`
    font-family: 'ChakraPetch-SemiBold';
    font-size: 28px;
    text-align: center;
    color: ${Colors.gray[100]};
`;

export const ContainerLogout = styled.TouchableOpacity`
    width: 10%;
    align-items: flex-end;
    margin: 0 15px 0 0;
`;

export const ContainerArrowBack = styled.TouchableOpacity`
    width: 10%;
    align-items: flex-start;
    margin: 0 0 0 15px;
`;

export const SubHeader = styled.Text`
font-family: 'ChakraPetch-SemiBold';
font-size: 14px;
text-align: center;
color: ${Colors.gray[100]};`
;