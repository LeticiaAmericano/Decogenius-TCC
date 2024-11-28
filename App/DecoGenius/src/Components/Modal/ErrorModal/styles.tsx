// Libs
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../Constants/Colors';

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.red[500]};
`;

export const ModalContent = styled.View`
    width: 60%;
    background-color: ${Colors.gray[100]};
    padding: 20px;
    border-radius: 30px;
    min-height: 300px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;

export const ModalTitleContent = styled.View`
    width: 100%;
    background-color: ${Colors.gray[100]};
    border-radius: 30px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;

export const ModalTitle = styled.Text`
    font-family: 'Nunito-Bold';
    font-size: 35px;
    color: ${Colors.red[500]};
    padding-bottom: 10px;
`;

export const DivisionLine = styled.View`
    width: 100%;
    height: 3px;
    background-color: red;
    border-radius: 30px;
`;

export const ModalText = styled.Text`
    padding-top: 15px;
    font-size: 14px;
    text-align: center;
    color: ${Colors.gray[900]};
    font-family: 'ChakraPetch-Regular';
    margin-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    background-color: ${Colors.red[500]};
    padding: 15px;
    border-radius: 5px;
    align-items: center;
    align-self: flex-end;
    width: 100%;
`;

export const ButtonText = styled.Text`
    color: ${Colors.gray[100]};
    font-family: 'ChakraPetch-SemiBold';
`;
