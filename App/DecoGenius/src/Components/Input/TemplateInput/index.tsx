import React from 'react';
import Colors from '../../../Constants/Colors';
import { IconSizes, IconsTypes } from '../../../Libs/ExternalIconsLibrary';
import Icon from '../../Icon';
import {
    ContainerError,
    ContainerIcon,
    ContainerText,
    ErroText,
    InputText,
    LabelText
} from './styles';
import type { ReactElement } from 'react';
import type { ITemplateInput } from '../../../Interfaces/Components/Input/ITemplateInput';
import type { IConfigContext } from '../../../Interfaces/Hooks/Context';
import { ScreenSizeConstants } from '../../../Constants/Config';
import { useConfig } from '../../../Hooks/Config';

const TemplateInput = ({
    labelText,
    labelColor,
    isTypePassword = false,
    iconName,
    errorMessage,
    textColor,
    mainColor,
    onIconPress,
    straightBottomBorderRadius = false,
    autoCorrect = true,
    ...rest
}: ITemplateInput): ReactElement => {
  
    const { screenWidth }: IConfigContext = useConfig();
   
    const labelTextFontSize: number =
        screenWidth <= ScreenSizeConstants.phone.maxSize ? 2.5 : 2;

    const containerIconWidth: string =
        screenWidth <= ScreenSizeConstants.phone.maxSize ? '12%' : '8%';

    const inputTextMinWidth: string =
        screenWidth <= ScreenSizeConstants.phone.maxSize ? '88%' : '92%';

    return (
        <>
            
            <ContainerText
                straightBottomBorderRadius={straightBottomBorderRadius}
                mainColor={mainColor ?? Colors.primary}>

                {labelText && (
                                <LabelText
                                    fontSize={labelTextFontSize}
                                    labelColor={labelColor ?? Colors.gray[900]}>
                                    {labelText}
                                </LabelText>
                            )}

                <InputText
                    {...rest}
                    width={inputTextMinWidth}
                    secureTextEntry={isTypePassword}
                    textColor={textColor ?? Colors.gray[900]}
                    hasError={!!errorMessage}
                    hasIcon={!!iconName}
                    autoCorrect={autoCorrect}
                />
                {iconName && (
                    <ContainerIcon
                        width={containerIconWidth}
                        onPress={onIconPress}>
                        <Icon
                            name={iconName}
                            iconFamily={IconsTypes.fontAwesome}
                            size={IconSizes.extraSmall}
                        />
                    </ContainerIcon>
                )}
            </ContainerText>
            {errorMessage && (
                <ContainerError>
                    <ErroText>{errorMessage}</ErroText>
                </ContainerError>
            )}
        </>
    );
};

export default TemplateInput;
