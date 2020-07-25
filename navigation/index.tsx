import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, AuthStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ViewBill from '../screens/ViewBill';
import { useDispatch, useSelector } from 'react-redux';
import { StoreModel } from '../redux/Model/Store.model';
import { fetchUserToken } from '../services/AuthService';
import { Login } from '../screens/Authentication/Login';
import { AppLoading } from 'expo';
import FaceDetection from '../screens/Authentication/FaceDetection';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
    /**
     * Variables declared.
     */
    const dispatch = useDispatch()
    const user = useSelector((store: StoreModel) => store.user)

    /**
     * calls the authenticatedUser function to check the user state.
     */
    React.useEffect(() => {
        authenticateUser();
    }, [])

    
    /**
     * Checks for authenticated user.
     */
    const authenticateUser = async () => {
        try {
            const token = await fetchUserToken();
            if (token) {
                dispatch({type: 'RESTORE_TOKEN', payload: token});
            } else {
                dispatch({type: 'SIGN_OUT'});
            }
        } catch (error) {
            console.log(error);
            dispatch({type: 'SIGN_OUT'});
        }
  }

  if (user.isLoading) {
    return <AppLoading/>
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {
        user.isSignOut ?
        <AuthNavigator/> :
        <RootNavigator />
      }
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="ViewBill" component={ViewBill}/> 
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="FaceDetection" component={FaceDetection} />
      <AuthStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </AuthStack.Navigator>
  );
}
