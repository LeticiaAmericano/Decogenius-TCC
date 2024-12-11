import React, { createContext, useContext } from 'react';
import { Dimensions } from 'react-native';
import type { IConfigContext } from '../Interfaces/Hooks/Context.tsx';

const ConfigContext = createContext({});

const ConfigProvider = ({
    children
}: {
    children: JSX.Element;
}): JSX.Element => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <ConfigContext.Provider value={{ screenWidth }}>
            {children}
        </ConfigContext.Provider>
    );
};

const useConfig = (): IConfigContext => {
    const context = useContext(ConfigContext) as IConfigContext;

    if (!context) {
        throw new Error('useConfig must be use inside ConfigProvider');
    } 

    return context;
};

export { ConfigProvider, useConfig };