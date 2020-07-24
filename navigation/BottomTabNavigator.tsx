import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, HomeScreenParams, BillScreenParams, OutageScreenParams, MoreOptionScreenParams } from '../types';
import { Icon, Thumbnail } from 'native-base';
import Outage from '../screens/Outage';
import MoreOptions from '../screens/MoreOptions';
import Bill from '../screens/Bill';
import PaymentHistory from '../screens/PaymentHistory';
import MeterReading from '../screens/MeterReading';
import Home from '../screens/Home';
import OutageMap from '../screens/OutageMap';
import { View, AsyncStorage } from 'react-native';
import MeterReadingCamera from '../screens/MeterReadingCamera';
import BillAnalytics from '../screens/BillAnalytics';
import EnrollPrograms from '../screens/EnrollPrograms';
import SafetyInformation from '../screens/SafetyInformation';
import MyAlerts from '../screens/MyAlerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

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

  const logout = () => {
    AsyncStorage.getAllKeys()
        .then((keys: any) => AsyncStorage.multiRemove(keys))
        .then(() =>  dispatch({type: 'SIGN_OUT'}));
  } 

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ 
          headerTitle: () => (
            <View style={{
                width: 50,
                justifyContent:'center',
                alignItems:'center',
                height: 50,
                borderRadius: 5,
                backgroundColor: '#fff'}}
            >
              <Thumbnail source={require('../assets/images/logo.png')} style={{height: 50, width: 50}}/>
            </View>
          ),
          headerRight: () => (
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={logout}>
                <Icon type='MaterialCommunityIcons' name='logout' style={{color: 'white'}}/>
              </TouchableOpacity>
            </View>
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

