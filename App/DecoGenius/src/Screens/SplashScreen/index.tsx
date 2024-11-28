import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Loading from '../../Components/Loading';
import NavigateConstants from '../../Constants/Navigate';

const SplashScreen: React.FC = (): JSX.Element => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate(NavigateConstants.SignIn); 
        }, 2000);
    
        return () => clearTimeout(timer);
      }, [navigation]);
    
    return <Loading />;
};

export default SplashScreen;
