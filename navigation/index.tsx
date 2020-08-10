import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Platform, StyleSheet, ImageBackground, Text, Image, Dimensions, View } from 'react-native';

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
import FlashMessage from "react-native-flash-message";
import { useRef, useEffect } from 'react';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Thumbnail, Left, Body } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme, navigation }: any) {
  
    /**
     * Variables declared.
     */
    const dispatch = useDispatch()
    const user = useSelector((store: StoreModel) => store.user)
    const navigationRef = useRef<any>();
    const showNotifications = useSelector((store: any) => store.notification.showNotification);
    const notificationData = useSelector((store: any) => store.notification.notifications);
    const notificationRef = useRef<any>();

    useEffect(() => {
      let timer: any;
      if (showNotifications) {
        timer = setTimeout(() => {
          console.log('here');
          showMessage({
            message: 'Notification',
            description: `You have ${notificationData.filter((data: any) => !data.Read).length || 0} new notification(s).`,
            type: "default",
            position: 'top',
            floating: true,
            backgroundColor: "#EDF2F4", // background color
            color: 'black',
            duration: 5000,
            animated: true,
            autoHide: true,
            icon: require('../assets/images/Icons/notification-banner.png'),
            onPress: () => navigationRef.current.navigate('NotificationScreenTab')
          })
        //  notificationRef.current.show();
       //   notificationRef.current.hide();
          dispatch({type: 'SHOW_NOTIFICATIONS', payload: false})
        }, 1000)
      }
      return () => {
        clearTimeout(timer);
      }
    }, [showNotifications]);

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
      ref={navigationRef}
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
      <Stack.Screen name="Back" component={BottomTabNavigator} />
      <Stack.Screen name="ViewBill" component={ViewBill}   options={{ 
          headerShown: true,
          headerTitle: 'View Bill',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: '#3377bb'
          },
          headerTintColor: '#fff'
        }}/> 
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



const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#123',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	button: {
		marginBottom: 12,
		paddingVertical: 10,
		paddingHorizontal: 44,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: '#fff',
	},
	customView: {
		width: Dimensions.get('window').width,
		alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
   // borderBottomLeftRadius: 16,
   // borderBottomRightRadius: 16,
    // borderRadius: 16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EDF2F4'
	},
	customViewAndroid: {
		width: Dimensions.get('window').width,
		alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  //  borderBottomLeftRadius: 16,
   // borderBottomRightRadius: 16,
    // borderRadius: 16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EDF2F4'
	},
	imageInner: {
		borderRadius: 12,
		width: 100,
		height: 100,
	},
});