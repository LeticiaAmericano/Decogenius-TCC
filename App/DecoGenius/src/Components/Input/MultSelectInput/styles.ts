import { ExternalStylingLibrary as styled } from '../../../Libs/ExternalStylingLibrary/ExternalStylingLibrary';
import Colors from '../../../Constants/Colors';
import type { IMultSelectInputStyleProps } from '../../../Interfaces/Components/IMultiSelectInput';
import { ExternalResponsiveFontSize } from '../../../Libs/ExternalResponsiveFontSize';
import type { ILabelText } from '../../../Interfaces/Components/Input/ITemplateInput';

export const SelectInputContainer = styled.View<IMultSelectInputStyleProps>`
    min-height: ${({ height }: IMultSelectInputStyleProps) =>
        height != null ? height : 86}px;
`;

export const SimpleInputContainer = styled.View<IMultSelectInputStyleProps>`
    margin: 5px 0 5px 0;
    height: ${({ height }: IMultSelectInputStyleProps) =>
        height != null ? height : 86}px;
`;

export const ListContainer = styled.View<IMultSelectInputStyleProps>`
    background-color: ${({ backgroundColor }: IMultSelectInputStyleProps) =>
        backgroundColor != null ? backgroundColor : Colors.tableColor};
    min-height: 1px;
    z-index: 2;
`;

export const MultiInputContainer = styled.View`
    margin: 10px 0;
`;

export const ContainerError = styled.View`
    width: 100%;
`;

export const ErroText = styled.Text`
    color: ${Colors.warning};
`;

export const LabelText = styled.Text<ILabelText>`
    color: ${Colors.black};
    font-size: ${(props: ILabelText) =>
        ExternalResponsiveFontSize.percentage(props.fontSize)};
    align-self: flex-start;
    width: 100%;
`;
