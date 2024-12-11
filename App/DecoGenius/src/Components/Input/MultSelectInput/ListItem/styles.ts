import { ExternalStylingLibrary as styled } from '../../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import type {
    IStyledListComponentProps,
    IStyledListValueProps
} from '../../../../Interfaces/Components/IMultiSelectInput';
import Colors from '../../../../Constants/Colors';

export const ListComponent = styled.TouchableOpacity<IStyledListComponentProps>`
    width: 100%;
    padding: 6px;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    border-top-width: ${(props: IStyledListComponentProps) =>
        props.index === 0 ? '0' : '1px'};
    border-color: ${Colors.gray[100]};
    
`;

export const IconContainer = styled.TouchableOpacity``;

export const ListValue = styled.Text<IStyledListValueProps>`
    font-size: 15px;
    color: ${({ textColor }: IStyledListValueProps) => textColor};
    font-family: 'ChakraPetch-Regular';
    padding-left: 5px;
`;
