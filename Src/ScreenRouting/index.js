/**
 * Created By Sukumar Abhijeet 14/05/2019
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';

const NavContainer = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <PaperProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen component={HomeScreen} name='Home' />
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    );

};

export default NavContainer;
