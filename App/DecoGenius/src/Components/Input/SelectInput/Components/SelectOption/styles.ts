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
    background-color: ${({ backgroundColor }: SelectOptionContainerProps) =>
        backgroundColor ? backgroundColor : Colors.white};
    padding: 16px 4px;
    border-bottom-width: 1px;
    border-color: ${Colors.gray};
`;

export const SelectOptionText = styled.Text`
    font-size: 18px;
    color: ${Colors.black};
    margin-left: 10px;
`;
