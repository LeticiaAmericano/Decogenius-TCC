import Colors from '../../Constants/Colors';
import type {
    IContainerInputEditableWidthProps,
    ISimpleInputContainer
} from '../../Interfaces/Screens/ISignIn';
import { ExternalStylingLibrary  as styled} from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    background-color: ${Colors.primary};
    height: 100%;
    width: 100%;
`;

export const LoginContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
`;

export const ContentContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    width: 100%;
    font-family: 'ChakraPetch-SemiBold';
    font-size: 50px;
    color: ${Colors.gray[100]};
    text-align: center;
    margin-bottom: 40px;
`;


export const InputContainer = styled.View`
    height: 200px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const ContainerInputEditableWidth = styled.View<IContainerInputEditableWidthProps>`
    width: ${(props: IContainerInputEditableWidthProps) => props.width};
    height: 100%;
`;

export const SimpleInputContainer = styled.View<ISimpleInputContainer>`
    max-height: 100px;
    margin: 0 0 25px 0;
`;

export const LinkText = styled.Text`
    width: 100%;
    font-family: 'ChakraPetch-Regular';
    font-size: 12px;
    color: ${Colors.gray[100]};
    text-align: center;
    margin: 0 0 10px 0;
`;

export const LinkContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

