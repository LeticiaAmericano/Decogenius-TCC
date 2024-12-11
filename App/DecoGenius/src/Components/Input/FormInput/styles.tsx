import Colors from '../../../Constants/Colors';
import type { IStyledContainerTextProps } from '../../../Interfaces/Components/Input/ISelectInput';
import type {
  IInputText,
  ILabelText
} from '../../../Interfaces/Components/Input/ITemplateInput';
import { ExternalStylingLibrary as styled} from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';

export const LabelText = styled.Text<ILabelText>`
  color: ${Colors.primary};
  font-size: 16px;
  font-family: 'ChakraPetch-SemiBold';
  padding-bottom: 8px;
`

export const ContainerText = styled.View<IStyledContainerTextProps>`
  flex: 1;
  background-color: ${(props: IStyledContainerTextProps) =>
    props.mainColor ? props.mainColor : Colors.gray[900]};
  min-height: 50px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;


export const InputText = styled.TextInput<IInputText>`
  border-radius: 6px;
  width: 100%;
  font-family: 'ChakraPetch-Regular';
  color: ${Colors.primary};
  font-size: 16px;
  background-color: ${Colors.gray[200]}
`

export const ContainerError = styled.View`
  width: 100%;
`

export const ErroText = styled.Text`
  color: ${Colors.red[500]};
`