// Libs
import React, { useState } from 'react';

// Interfaces
import type {
    IErrorModal,
    IErrorModalState
} from '../../../Interfaces/Components/Modal/IErrorModal';

// Styles
import { ButtonText, CloseButton, ModalText } from './styles';

// Constants
import Colors from '../../../Constants/Colors';
import { ErrorModalConstants } from '../../../Constants/Components/ErrorModal';

// Components
import TemplateModal from '../TemplateModal';

const ErrorModal = ({
    errorModalState,
    setErrorModalState
}: IErrorModal): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(errorModalState.visibility);

    const handleModalClose = (): void => {
        setErrorModalState((prev: IErrorModalState) => ({
            ...prev,
            visibility: false
        }));

        setVisible(false);
    };

    return (
        <TemplateModal
            title={ErrorModalConstants.title}
            visible={visible}
            titleColor={Colors.gray[900]}
            dividerColor={Colors.red[500]}
            setVisible={setVisible}>
            <ModalText>{errorModalState.modalBody}</ModalText>
            {errorModalState.modalErrorStackTrace && (
                <ModalText>{errorModalState.modalErrorStackTrace}</ModalText>
            )}
            <CloseButton onPress={handleModalClose}>
                <ButtonText>{ErrorModalConstants.button}</ButtonText>
            </CloseButton>
        </TemplateModal>
    );
};

export default ErrorModal;
