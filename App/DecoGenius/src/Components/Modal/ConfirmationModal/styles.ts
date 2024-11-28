// Libs
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../Constants/Colors';

export const ModalText = styled.Text`
    padding-top: 15px;
    font-size: 16px;
    text-align: center;
    align-self: center;
    color: ${Colors.black};
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const CloseButton = styled.TouchableOpacity`
    background-color: ${Colors.red};
    padding: 15px;
    border-radius: 30px;
    align-items: center;
    align-self: flex-end;
    width: 40%;
`;

export const ConfirmButton = styled.TouchableOpacity`
    background-color: ${Colors.blueOcean};
    padding: 15px;
    border-radius: 30px;
    align-items: center;
    align-self: flex-end;
    width: 40%;
`;

export const ButtonText = styled.Text`
    color: ${Colors.white};
    font-weight: bold;
`;
