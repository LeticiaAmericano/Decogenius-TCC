import Colors from '../../../Constants/Colors';
import type { IStyledContainerTextProps } from '../../../Interfaces/Components/Input/ISelectInput';
import type {
    IContainerIcon,
    IInputText,
    ILabelText
} from '../../../Interfaces/Components/Input/ITemplateInput';
import { ExternalStylingLibrary as styled} from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const LabelText = styled.Text<ILabelText>`
    color: ${Colors.primary};
    font-size: 15px;
    font-family: 'ChakraPetch-Regular';
    padding: 7px;
`

export const Container = styled.View`
    flex-direction: column;
    flex: 1;
    width: 100%;
`

export const ContainerText = styled.View<IStyledContainerTextProps>`
  flex: 1;
  background-color: ${(props: IStyledContainerTextProps) =>
    props.mainColor ? props.mainColor : Colors.gray[900]};
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: ${(props: IStyledContainerTextProps) =>
    props.straightBottomBorderRadius ? '0' : '6px'};
  border-bottom-right-radius: ${(props: IStyledContainerTextProps) =>
    props.straightBottomBorderRadius ? '0' : '6px'};
  border-bottom-width: ${(props: IStyledContainerTextProps) =>
    props.straightBottomBorderRadius ? '1px' : '0'};
  border-color: ${Colors.gray+';'}
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;


export const InputText = styled.TextInput<IInputText>`
    flex: 1;
    font-family: 'ChakraPetch-Regular';
    color: ${(props: IInputText) =>
        props.textColor ? props.textColor : Colors.gray[900]};
    font-size: 15px;
`

export const ContainerError = styled.View`
    width: 100%;
`

export const ErroText = styled.Text`
    color: ${Colors.red[500]};
`

export const ContainerIcon = styled.TouchableOpacity<IContainerIcon>`
    width: ${(props: IContainerIcon) => props.width};
`
