// Imports react
import { RFValue } from 'react-native-responsive-fontsize';

// Libs
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../Constants/Colors';

// Interfaces
import type { ContainerItemProps } from '../Interfaces/ITemplateItem';

export const ContainerItem = styled.TouchableOpacity<ContainerItemProps>`
    width: ${RFValue(100)}px;
    height: ${RFValue(100)}px;
    background-color: ${(props: ContainerItemProps) =>
        props.backgroundColor ? props.backgroundColor : Colors.blueOcean};
    margin: 0 ${(props: { margin: number }) => RFValue(props.margin)}px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`;
