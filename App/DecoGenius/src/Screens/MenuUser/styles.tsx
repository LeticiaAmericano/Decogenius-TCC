import { StyleSheet } from 'react-native';
import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import Colors from '../../Constants/Colors';

export const Container = styled.ScrollView`
    background-color: ${Colors.gray[100]};
    height: 100%;
    width: 100%;
`;

export const ContainerBody = styled.View`
    height: 83%;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    padding: 6% 0 0 0;
    justify-content: space-between;
    
`;

export const ContainerItemList = styled.View`
    margin-top: 15px;
    height: 70%;
    width: 85%;
`;

export const ContainerAdditionalStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    }
});

export const ContainerTitle = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 35px;
`;

export const Text = styled.Text`
    color: ${Colors.primary};
    font-size: 26px;
    font-family: 'ChakraPetch-SemiBold';
`;