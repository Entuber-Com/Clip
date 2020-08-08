import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, HomeScreenParams, BillScreenParams, OutageScreenParams, MoreOptionScreenParams, NavigationScreenParams } from '../types';
import { Icon, Thumbnail, Text } from 'native-base';
import Outage from '../screens/Outage';
import MoreOptions from '../screens/MoreOptions';
import Bill from '../screens/Bill';
import PaymentHistory from '../screens/PaymentHistory';
import MeterReading from '../screens/MeterReading';
import Home from '../screens/Home';
import OutageMap from '../screens/OutageMap';
import { View, AsyncStorage, Platform } from 'react-native';
import MeterReadingCamera from '../screens/MeterReadingCamera';
import BillAnalytics from '../screens/BillAnalytics';
import EnrollPrograms from '../screens/EnrollPrograms';
import SafetyInformation from '../screens/SafetyInformation';
import MyAlerts from '../screens/MyAlerts';
import { useDispatch, useSelector } from 'react-redux';
import {Image} from 'react-native'
import { FloatingIcon } from '../components/FloatingIcon';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Linking } from 'expo';
import GasEmergency from '../screens/GasEmergency';
import DiagnoseOutage from '../screens/DiagnoseOutage';
import ReportOutage from '../screens/ReportOutage';
import { NotificationsHome } from '../screens/NotificationsTab/NotificationsHome';
import * as firebase from 'firebase';
import { useEffect, useState } from 'react';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState<any>([]);
  const notificationData = useSelector((store: any) => store.notification.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    let timer: any;
    const notificationRef = firebase
    .database()
    .ref('Notification Fanout/ClientID/5KPoVKeO14afWztF9maifPTaf3h1')
    
   /*  notificationRef
    .once('value', (snapshot: any) => {
      const not: any = [];
      snapshot.forEach((childSnapshot: any) => {
        not.push({
          id: childSnapshot.key, 
          ...childSnapshot.val()
        });
      });
      setNotifications(not)
      console.log('onvce', not)
        dispatch({type: 'GET_NOTIFICATIONS', payload: not})
    }) */

    notificationRef.on('child_changed', (data: any) => {
      notificationRef
      .once('value', (snapshot: any) => {
        const not: any = [];
        snapshot.forEach((childSnapshot: any) => {
          not.push({
            id: childSnapshot.key, 
            ...childSnapshot.val()
          });
        });
        setNotifications(not)
        dispatch({type: 'GET_NOTIFICATIONS', payload: not});
        })
    })

    notificationRef.on('child_added', (data: any) => {
      notificationRef
      .once('value', (snapshot: any) => {
        const not: any = [];
        snapshot.forEach((childSnapshot: any) => {
          not.push({
            id: childSnapshot.key, 
            ...childSnapshot.val()
          });
        });
        setNotifications(not)
        dispatch({type: 'GET_NOTIFICATIONS', payload: not})
        if (not.filter((data: any) => data.Read === false).length > 0) {
          if (data.Type && data.Type === 'BILL_PAY') {
            timer = setTimeout(() => {
              dispatch({type: 'SHOW_NOTIFICATIONS', payload: true})
            }, 10000)
          } else {
            dispatch({type: 'SHOW_NOTIFICATIONS', payload: true})
          }
        } else {
          dispatch({type: 'SHOW_NOTIFICATIONS', payload: false})
        }
      })
    })

    notificationRef.on('child_removed', (data: any) => {
      notificationRef
      .once('value', (snapshot: any) => {
        const not: any = [];
        snapshot.forEach((childSnapshot: any) => {
          not.push({
            id: childSnapshot.key, 
            ...childSnapshot.val()
          });
        });
        setNotifications(not)
        dispatch({type: 'GET_NOTIFICATIONS', payload: not})
      })
    })

    return () => {
      notificationRef.off()
      clearTimeout(timer);
    }
  }, [])

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreenTab"
      tabBarOptions={{ activeTintColor: '#ed7738', inactiveTintColor: Colors.PRIMARY, keyboardHidesTabBar: true }}
    >
      <BottomTab.Screen
        name="HomeScreenTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          unmountOnBlur:true,
          tabBarIcon: ({ color, focused }) => <TabBarIcon type='FontAwesome' name="home" color={color} focused={focused}/>,
        }}
      />
      <BottomTab.Screen
        name="BillScreenTab"
        component={BillNavigator}
        options={{
          tabBarLabel: 'Bill',
          unmountOnBlur:true,
          tabBarIcon: ({ color, focused }) => 
          <View style={{borderTopColor: focused ? '#ed7738' : 'none', borderTopWidth: focused ? 5 : 0}}>
            <Icon style={{ fontSize: 30, marginBottom: -3, color: focused ? '#ed7738' : Colors.PRIMARY }} ios='ios-stats' android='md-stats' />
          </View>

        }}
      />
      <BottomTab.Screen
        name="OutageScreenTab"
        component={OutageNavigator}
        options={{
          tabBarLabel: 'Outage',
          unmountOnBlur:true,
          tabBarIcon: ({ color, focused }) => <TabBarIcon type='MaterialCommunityIcons' focused={focused} name="flash" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NotificationScreenTab"
        component={NotificationNavigator}
        options={{
          tabBarLabel: 'Notifications',
          unmountOnBlur:true,
          tabBarBadge: notifications && notifications.filter((data: any) => !data.Read).length,
          tabBarIcon: ({ color, focused }) => 
          (
            !notifications || notifications.filter((data: any) => !data.Read).length === 0 ?
            <TabBarIcon type='MaterialIcons' focused={focused} name="notifications" color={color} />
            : <TabBarIcon type='MaterialIcons' focused={focused} name="notifications-active" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MoreOptionsScreenTab"
        component={MoreOptionsNavigator}
        options={{
          tabBarLabel: 'More',
          unmountOnBlur:true,
          tabBarIcon: ({ color, focused }) => <TabBarIcon type='Feather' focused={focused} name="more-horizontal" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(
  props: { name: string; color: string; focused?: boolean, type?: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"}
) {
  return (
    <View style={{borderTopColor: props.focused ? '#ed7738' : 'none', borderTopWidth: props.focused ? 5 : 0}}>
      <Icon style={{ fontSize: 30, marginBottom: -3, color: props.focused ? '#ed7738' : Colors.PRIMARY }} {...props} />
    </View>);
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeScreenParams>();

function HomeNavigator() {
  const dispatch =  useDispatch()
  const notificationData = useSelector((store: any) => store.notification.notifications)

  const logout = () => {
    AsyncStorage.getAllKeys()
        .then((keys: any) => AsyncStorage.multiRemove(keys))
        .then(() =>  dispatch({type: 'SIGN_OUT'}));

    notificationData.forEach((elem: any) => {
      firebase.database()
      .ref('Notification Fanout/ClientID/5KPoVKeO14afWztF9maifPTaf3h1/'+ elem.id).remove()
    })
  } 

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ 
          headerLeft: () => <FloatingIcon/>,
          headerTitle: () => (
            <View style={{
                width: 200,
                justifyContent:'center',
                alignItems:'center',
                height: 50,
                borderRadius: 5,
                paddingLeft: 75,
                marginBottom: 15,
                backgroundColor: '#fff'}}
            >
              <Image source={require('../assets/images/logo1.png')} style={{height: 50, padding: 0, resizeMode: Platform.OS==="ios"?'contain':'center'}}/>
            </View>
          ),
          headerRight: () => (
            <Menu>
            <MenuTrigger children={(<View style={{padding:10}}>
                <Icon type='Entypo' name='menu'></Icon>
              </View>)} />
              <MenuOptions>
                <MenuOption onSelect={() => Linking.canOpenURL('tel:1-800-436-7734')
                    .then((supported: any) => {
                      if (supported) {
                        return Linking.openURL('tel:1-800-436-7734')
                          .catch(() => null);
                      }
                    })} 
                >
                  <View style={{flexDirection: 'row',padding: 10}}>
                    <Icon type='Entypo' name='phone'/>
                    <Text style={{marginLeft: 5}}>Call Emergency</Text>
                  </View>
                </MenuOption>
                <MenuOption>
                  <View style={{flexDirection: 'row',padding: 10}}>
                    <Icon type='Feather' name='settings'/>
                    <Text style={{marginLeft: 5}}>Security Settings</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => Linking.canOpenURL('tel:1-800-436-7734')
                    .then((supported: any) => {
                      if (supported) {
                        return Linking.openURL('tel:1-800-436-7734')
                          .catch(() => null);
                      }
                    })} 
                >
                  <View style={{flexDirection: 'row',padding: 10}}>
                    <Icon type='AntDesign' name='contacts'/>
                    <Text style={{marginLeft: 5}}>Contact Information</Text>
                  </View>
                </MenuOption>
                <MenuOption  onSelect={logout}>
                  <View style={{flexDirection: 'row',padding: 10}}>
                    <Icon type='MaterialCommunityIcons' name='logout'/>
                    <Text style={{marginLeft: 5}}>Logout</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
          </Menu>
         /*    <View style={{padding: Platform.OS==="ios"?8:10}}>
              <TouchableOpacity onPress={logout}>
                <Icon type='MaterialCommunityIcons' name='logout' style={{color: 'white'}}/>
              </TouchableOpacity>
            </View> */
          ),
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
    </HomeStack.Navigator>
  );
}

const BillStack = createStackNavigator<BillScreenParams>();

function BillNavigator() {
  return (
    <BillStack.Navigator initialRouteName="BillScreen">
      <BillStack.Screen
        name="BillScreen"
        component={Bill}
        options={{ 
          headerTitle: 'View Bill',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <BillStack.Screen
        name="MeterReading"
        component={MeterReading}
        options={{ 
          headerTitle: 'Meter Reading',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <BillStack.Screen
        name="MeterReadingCamera"
        component={MeterReadingCamera}
      />
      <BillStack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{ 
          headerTitle: 'Payment History',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <BillStack.Screen
        name="BillAnalytics"
        component={BillAnalytics}
        options={{ 
          headerTitle: 'View Bill',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
    </BillStack.Navigator>
  );
}

const OutageStack = createStackNavigator<OutageScreenParams>();

function OutageNavigator() {
  return (
    <OutageStack.Navigator>
      <OutageStack.Screen
        name="OutageScreen"
        component={Outage}
        options={{ 
          headerTitle: 'Outage',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <OutageStack.Screen
        name="GasEmergency"
        component={GasEmergency}
        options={{ 
          headerTitle: 'Gas Emergency',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <OutageStack.Screen
        name="ReportOutage"
        component={ReportOutage}
        options={{ 
          headerTitle: 'Do you have power?',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <OutageStack.Screen
        name="DiagnoseOutage"
        component={DiagnoseOutage}
        options={{ 
          headerTitle: 'Diagnose Outage',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <OutageStack.Screen
        name="OutageMap"
        component={OutageMap}
        options={{ 
          headerTitle: 'Outage Maps',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
    </OutageStack.Navigator>
  );
}
const MoreOptionsStack = createStackNavigator<MoreOptionScreenParams>();

function MoreOptionsNavigator() {
  return (
    <MoreOptionsStack.Navigator>
      <MoreOptionsStack.Screen
        name="MoreOptionsScreen"
        component={MoreOptions}
        options={{ 
          headerTitle: 'More',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <MoreOptionsStack.Screen
        name="EnrollPrograms"
        component={EnrollPrograms}
        options={{ 
          headerTitle: 'Enroll',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <MoreOptionsStack.Screen
        name="PushNotifications"
        component={MyAlerts}
        options={{ 
          headerTitle: 'My Alerts',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
      <MoreOptionsStack.Screen
        name="SafetyInfo"
        component={SafetyInformation}
        options={{ 
          headerTitle: 'Safety Information',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
    </MoreOptionsStack.Navigator>
  );
}

const NotificationStack = createStackNavigator<NavigationScreenParams>() 

function NotificationNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationsHome}
        options={{ 
          headerTitle: 'Notifications',
          headerTitleAlign: 'center',
          headerStyle:{
              backgroundColor: Colors.PRIMARY
          },
          headerTintColor: '#fff'
        }}
      />
    </NotificationStack.Navigator>
  );
}