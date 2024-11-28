// Libs
import { ExternalStylingLibrary as styled } from '../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../../Constants/Colors';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    height: 60px;
    border-radius: 5px;
    background-color: ${Colors.gray[100]};
`;

export const ContainerIcon = styled.TouchableOpacity`
`;

export const SearchInputContainer = styled.View`
    display: flex;
    width: 85%;
    height: 100%;
`;
