// Libs
import type { ReactElement, ReactNode } from 'react';
import React, { useCallback } from 'react';

// Components
import TemplateModal from '../TemplateModal';

// Constants
import ConfirmationConstants from '../../../Constants/Components/ConfirmationModal';

// Interfaces
import type {
    IConfirmationModal,
    IConfirmationModalState
} from '../../../Interfaces/Components/Modal/IConfirmationModal';

// Styles
import {
    ButtonContainer,
    ButtonText,
    CloseButton,
    ConfirmButton,
    ModalText
} from './styles';

const ConfirmationModal = <
    TConfirmationAction extends (...args: unknown[]) => unknown
>({
    confirmationModalState,
    setConfirmationModalState
}: IConfirmationModal<TConfirmationAction>): ReactElement<
    IConfirmationModal<TConfirmationAction>
> => {
    const clearConfirmationModalState: () => void = useCallback(() => {
        setConfirmationModalState({
            visibility: false,
            action: () => {}
        } as IConfirmationModalState<TConfirmationAction>);
    }, [setConfirmationModalState]);

    const handleConfirmationPress: () => Promise<void> =
        useCallback(async () => {
            await confirmationModalState.action();
            clearConfirmationModalState();
        }, [confirmationModalState, clearConfirmationModalState]);

    const ConfirmationFooter: ReactNode = (
        <ButtonContainer>
            <CloseButton onPress={clearConfirmationModalState}>
                <ButtonText>{ConfirmationConstants.CancelButton}</ButtonText>
            </CloseButton>
            <ConfirmButton onPress={handleConfirmationPress}>
                <ButtonText>{ConfirmationConstants.AgreeButton}</ButtonText>
            </ConfirmButton>
        </ButtonContainer>
    );

    return (
        <TemplateModal
            defaultFooter={false}
            footer={ConfirmationFooter}
            title={ConfirmationConstants.title}
            visible={confirmationModalState.visibility}
            setVisible={clearConfirmationModalState}>
            <ModalText>{ConfirmationConstants.body}</ModalText>
        </TemplateModal>
    );
};

export default ConfirmationModal;
