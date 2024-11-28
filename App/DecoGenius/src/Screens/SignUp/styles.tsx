import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

import Colors from '../../Constants/Colors';
import type {
    ISimpleInputContainer
} from '../../Interfaces/Screens/ISignUp';

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
    height: 20%;
    width: 100%;
    
`;

export const HeaderContainer = styled.View`
    height: 15%;
    width: 100%;
    padding: 8px 14px 0 14px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: ${Colors.primary};
`;

export const IconPressable = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    padding: 5px;
`;

export const Title = styled.Text`
    margin: 0 10px;
    font-family: 'ChakraPetch-SemiBold';
    font-size: 35px;
    color: ${Colors.gray[100]};
`;

export const InputArea = styled.View`
    height: 100%;
    width: 99%;
    padding: 20px;
    flex-wrap: wrap;
    flex-direction: row;
`;

export const SimpleInputContainer = styled.View<ISimpleInputContainer>`
    width: ${(props: ISimpleInputContainer) => props.width ?? '100%'};
    padding: 14px 12px;
    padding-top: ${(props: ISimpleInputContainer) =>
        props.paddingTop ?? '14px'};
`;

export const BodyContainer = styled.View`
    height: 85%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.primary};
    padding-bottom: 30px;
`;

export const LinkText = styled.Text`
    width: 100%;
    font-family: 'ChakraPetch-Regular';
    font-size: 12px;
    color: ${Colors.gray[100]};
    text-align: center;
    margin: 15px 0 15px 0;
`;