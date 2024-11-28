// React
import React, { useState } from 'react';

// Components
import TemplateInput from '../TemplateInput';

// Interfaces
import type { ReactElement } from 'react';
import type { TPasswordInput } from '../../../Interfaces/Components/Input/TPasswordInput';

// Constants
import { IconsConstants } from '../../../Libs/ExternalIconsLibrary';

const PasswordInput = (props: TPasswordInput): ReactElement => {
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    const currentIcon: string = hidePassword
        ? IconsConstants.fontAwesome.eye
        : IconsConstants.fontAwesome.eyeSlash;

    return (
        <TemplateInput
            {...props}
            isTypePassword={hidePassword}
            // iconName={currentIcon}
            onIconPress={() => setHidePassword(!hidePassword)}
        />
    );
};
export default PasswordInput;
