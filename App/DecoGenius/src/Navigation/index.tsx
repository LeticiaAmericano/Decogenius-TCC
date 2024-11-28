import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import MenuUser from '../Screens/MenuUser';
import Answer from '../Screens/Answer';
import Forms from '../Screens/Forms'


const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'SignIn',  headerShown: false}} 
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'SignUp',  headerShown: false}} 
        />
        <Stack.Screen
            name="MenuUser"
            component={MenuUser}
            options={{ title: 'MenuUser',  headerShown: false}} 
        />
        <Stack.Screen
            name="Answer"
            component={Answer}
            options={{ title: 'Answer',  headerShown: false}} 
        />
        <Stack.Screen
            name="Forms"
            component={Forms}
            options={{title: 'Forms', headerShown: false}}    
        />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
