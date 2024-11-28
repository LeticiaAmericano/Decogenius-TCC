import React from 'react';
import {
    Container,
    MainContainer,
    StyledImageLogo,
    Title,
} from './styles';
import DecoGeniusLogo from '../../Assets/DecoGeniusLogo.png';
import { useConfig } from '../../Hooks/Config';
import type { IConfigContext } from '../../Interfaces/Hooks/Context.tsx';
import { Text } from 'react-native';

const Loading: React.FC = (): JSX.Element => {    
    const { screenWidth }: IConfigContext = useConfig()

 
    return (
        <Container>
            <MainContainer>
                <StyledImageLogo
                    source={DecoGeniusLogo}
                    resizeMode="contain"
                    width={60}
                    height={60}
                />
                <Title>DecoGenius</Title>
            </MainContainer>
        </Container>
    );
};

export default Loading;
