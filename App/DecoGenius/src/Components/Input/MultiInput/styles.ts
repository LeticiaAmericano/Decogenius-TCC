// Libs
import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Interfaces
import type { IStyledListContainerProps } from '../../../Interfaces/Components/IMultiInput';

export const SimpleInputContainer = styled.View`
    width: 100%;
    min-height: 75px;
`;

export const ListContainer = styled.View<IStyledListContainerProps>`
    flex-direction: row;
    align-items: center;
    background-color: ${(props: IStyledListContainerProps) =>
        props.backgroundColor};
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;
