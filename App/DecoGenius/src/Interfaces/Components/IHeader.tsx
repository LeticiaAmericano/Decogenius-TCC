export interface IHeader {
    hasLogout?: boolean;
    title?: string;
    backButton?: boolean;
    hasPlant?: boolean;
    goBackFunction?: () => Promise<void> | (() => void);
}

export default IHeader;
