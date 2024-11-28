// Libs
import { ExternalStylingLibrary as styled } from '../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

// Interfaces
import type {
    IStyledListComponentProps,
    IStyledListValue
} from '../../../../Interfaces/Components/IMultiInput';

// Constants
import Colors from '../../../../Constants/Colors';

export const ListComponent = styled.TouchableOpacity<IStyledListComponentProps>`
    width: 88%;
    padding: 16px 4px;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    border-top-width: ${(props: IStyledListComponentProps) =>
        props.index === 0 ? '0' : '1px'};
    border-color: ${Colors.gray};
`;

export const IconContainer = styled.TouchableOpacity``;

export const ListValue = styled.Text<IStyledListValue>`
    font-size: 18px;
    color: ${({ textColor }: IStyledListValue) => textColor};
    margin-left: 8px;
`;
