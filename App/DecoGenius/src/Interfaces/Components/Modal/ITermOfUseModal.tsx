import type { Dispatch, SetStateAction } from 'react';

export interface ITermOfUseModal {
    isTermsOfUseOpen: boolean;
    setIsTermsOfUseOpen: Dispatch<SetStateAction<boolean>>;
}
