// Libs
import { ExternalStylingLibrary as styled } from '../../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Constants
import Colors from '../../../../../Constants/Colors';

// interfaces
import type { SelectOptionContainerProps } from '../../../../../Interfaces/Components/Input/ISelectInput';

export const SelectOptionContainer = styled.Pressable<SelectOptionContainerProps>`
    width: 100%;
    flex-direction: row;
    align-items: center;
    background-color: ${ Colors.gray[200]};
    padding: 16px 4px;
    border-bottom-width: 1px;
    border-color: ${Colors.gray[100]};
    border-radius: 5px 0 5px 0;
`;

export const SelectOptionText = styled.Text`
    font-size: 15px;
    color: ${Colors.primary};
    margin-left: 10px;
    font-family: 'ChakraPetch-Regular';
`;
