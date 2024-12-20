import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import type {
    IContainerInputEditableWidth,
    ILabelText,
    ISimpleInputContainer
} from '../../Interfaces/Screens/ISignUp';
import Colors from '../../Constants/Colors';

export const Container = styled.View`
    background-color: ${Colors.gray[100]};
    width: 100%;
    height: 100%;
    align-items: center;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const ContainerBody = styled.View`
    width: 100%;
    height: 84%;
    margin: 5px;
`;

export const HeaderContainer = styled.View`
    width: 100%;
    padding: 8px 14px 0 14px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const IconPressable = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    padding: 5px;
`;

export const ScrollViewInput = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})`
    width: 100%;
`;

export const InputArea = styled.View`
    flex-wrap: wrap;
    width: 80%;
    flex-direction: row;
`;

export const SimpleInputContainer = styled.View<ISimpleInputContainer>`
    width: ${(props: ISimpleInputContainer) => props.width ?? '100%'};
    padding-top: ${(props: ISimpleInputContainer) =>
        props.paddingTop ?? '14px'};
`;

export const ContainerInputEditableWidth = styled.View<IContainerInputEditableWidth>`
    max-width: ${(props: IContainerInputEditableWidth) =>
        props.width ?? '100%'};
    height: 100px;
    flex: 1;
    margin-top: ${(props: IContainerInputEditableWidth) =>
        props.marginTop ?? '4px'};
    margin-left: ${(props: IContainerInputEditableWidth) =>
        props.marginLeft ?? '4px'};
    margin-right: ${(props: IContainerInputEditableWidth) =>
        props.marginRight ?? '4px'};
    margin-bottom: ${(props: IContainerInputEditableWidth) =>
        props.marginBottom ?? '4px'};
`;

export const VariousInputsContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 12px;
    padding-top: 14px;
`;

export const SelectUFContainer = styled.View`
    flex: 1;
`;

export const SelectInputContainer = styled.View`
    width: 74%;
    height: 110px;
    align-items: center;
    justify-content: center;
`;

export const LabelText = styled.Text<ILabelText>`
    color: ${(props: any) =>
        props.labelColor ? props.labelColor : props.theme.colors.second};
    font-size: 15px;
    margin-bottom: 8px;
    align-self: flex-start;
    width: 100%;
    font-family: 'ChakraPetch-SemiBold';
`;

export const ContainerError = styled.View<any>`
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 4px;
    margin-left: ${(props: any) => props.marginLeft ?? '0px'};
`;

export const ErroText = styled.Text`
    color: ${({ theme }: any) => theme.colors.red[500]};
    font-family: 'ChakraPetch-Regular';
`;

export const ErrorContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const UploadButton = styled.TouchableOpacity`
    width: 100%;
    padding: 12px;
    background-color: ${Colors.primary};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
`;

export const UploadButtonText = styled.Text`
    color: ${Colors.gray[100]};
    font-size: 16px;
    font-family: 'ChakraPetch-SemiBold';
`;

export const ImagePreviewContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 8px;

    width: 100%;
`;

export const PreviewImage = styled.Image`
    width: 80px;
    height: 80px;
    margin: 4px;
    border-radius: 4px;
    border: 1px solid ${Colors.gray[300]};
`;

export const FileUploadContainer = styled.View`
    width: 74%;
    height: 220px;
    align-items: center;
    justify-content: center;
`;

export const ObservationInputContainer = styled.View`
    width: 78%;
    padding: 8px;
    margin-top: 12px;
`;

export const ObservationInputLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 16px;
    margin-bottom: 4px;
    font-family: 'ChakraPetch-SemiBold';
`;

export const ObservationInput = styled.TextInput`
    width: 100%;
    min-height: 80px;
    padding: 8px;
    background-color: ${Colors.gray[200]};
    border-radius: 8px;
    font-size: 16px;
    font-family: 'ChakraPetch-Regular';
    color: ${Colors.primary};
`;
