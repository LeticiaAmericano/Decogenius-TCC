// Libs
import { RFValue } from 'react-native-responsive-fontsize';
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../Constants/Colors';

export const ContainerIcon = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextItem = styled.Text`
    color: ${Colors.white};
    font-size: ${RFValue(14)}px;
    text-align: center;
    font-weight: 600;
    margin: 0 10px 10px 10px;
`;
