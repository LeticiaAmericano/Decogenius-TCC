import { StyleSheet } from 'react-native';
import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import Colors from '../../Constants/Colors';
import { ISimpleInputContainer } from '../../Interfaces/Screens/ISignUp';

export const Container = styled.ScrollView`
    background-color: ${Colors.gray[100]};
    height: 100%;
    width: 100%;
`;

export const ContainerBody = styled.View`
    height: 85%;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    padding: 6% 0 0 0;
`;

export const ContainerItemList = styled.View`
    height: 70%;
    width: 85%;
    
`;

export const ContainerFooter = styled.View`
    margin-top: 5px;
    align-items: center;
    width: 92%;
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
    padding: 0px 35px;
`;

export const Text = styled.Text`
    color: ${Colors.primary};
    font-size: 30px;
    font-family: 'ChakraPetch-SemiBold';
`;

export const SimpleInputContainer = styled.View<ISimpleInputContainer>`
    width: ${(props: ISimpleInputContainer) => props.width ?? '100%'};
    margin-bottom: 65px;
    padding: 0px 14px;
`;

export const ImageContainer = styled.View`
    width: 320px;
    height: 320px;
    border-radius: 5px;
    background-color: ${Colors.gray[200]};
    align-items: center;
    justify-content: center;
`;

export const Images = styled.Image`
    width: 305px;
    height: 305px;
    border-radius: 5px;
`;

export const LargeInput = styled.Text`
    width: 90%;
    font-family: 'ChakraPetch-Regular';
    color: ${Colors.primary};
`;
