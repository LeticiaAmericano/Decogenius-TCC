import React from 'react';
import type { ISimpleInput } from '../../../Interfaces/Components/Input/ISimpleInput';
import TemplateInput from '../TemplateInput';
import type { ReactElement } from 'react';

const SimpleInput = (props: ISimpleInput): ReactElement => (
    <TemplateInput {...props} />
);

export default SimpleInput;
