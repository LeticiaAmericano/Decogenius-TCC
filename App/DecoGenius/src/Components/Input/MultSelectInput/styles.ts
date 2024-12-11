import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import Colors from '../../../Constants/Colors';
import type { IMultSelectInputStyleProps } from '../../../Interfaces/Components/IMultiSelectInput';
import type { ILabelText } from '../../../Interfaces/Components/Input/ITemplateInput';

export const SelectInputContainer = styled.View<IMultSelectInputStyleProps>`
    min-height: ${({ height }: IMultSelectInputStyleProps) =>
        height != null ? height : 86}px;
`;

export const ListContainer = styled.View<IMultSelectInputStyleProps>`
    margin-top: 10px;
    background-color: ${({ backgroundColor }: IMultSelectInputStyleProps) =>
        backgroundColor != null ? backgroundColor : Colors.gray[200]};
    min-height: 1px;
    z-index: 2;
    border-radius: 5px;
`;

export const ContainerError = styled.View`
    width: 100%;
`;

export const ErroText = styled.Text`
    color: ${Colors.red[500]};
`;

export const LabelText = styled.Text<ILabelText>`
    color: ${Colors.primary};
    align-self: flex-start;
    width: 100%;
`;
