import React, { createContext, useContext } from 'react';
import { Dimensions } from 'react-native';

import type { IConfigContext } from '../Interfaces/Hooks/Context.tsx';

const ConfigContext = createContext({});

const useConfig = (): IConfigContext => {
    const context = useContext(ConfigContext) as IConfigContext;

    if (!context) {
        throw new Error('useConfig must be use inside ConfigProvider');
    }

    return context;
};

export { useConfig };
