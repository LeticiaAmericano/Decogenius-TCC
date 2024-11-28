// Libs
import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../Constants/Colors';
import type { IIconComponentProps } from '../../Interfaces/Components/IIcon';

export const IconComponent = styled.View<IIconComponentProps>`
    font-size: 25px;
    color: ${Colors.primary};
`;
