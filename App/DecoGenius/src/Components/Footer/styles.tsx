import type {
    IContainerFooter,
    ITextFooter
} from '../../Interfaces/Components/IFooter';
import { ExternalStylingLibrary as styled } from '../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const Container = styled.TouchableOpacity<IContainerFooter>`
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: ${(props: IContainerFooter) => props.backgroundColor};
    border-radius: 5px;
`;

export const IconContainer = styled.View`
    margin-right: 14px;
`;

export const Text = styled.Text<ITextFooter>`
    color: ${(props: { textColor: string }) => props.textColor};
    font-size: 17px;
    font-family: 'ChakraPetch-Regular';
`;
