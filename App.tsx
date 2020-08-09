import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureStore from './redux/store';
import { MenuProvider } from 'react-native-popup-menu';
import './hooks/Timer';
import * as firebase from 'firebase';
import FlashMessage from "react-native-flash-message";
import { Thumbnail } from 'native-base';


const firebaseConfig =  {
    apiKey: "AIzaSyD4NZ1oc83NF5HswWXsWcJf3yN1Fcsx-Bg",
    authDomain: "entuber.firebaseapp.com",
    databaseURL: "https://entuber.firebaseio.com",
    projectId: "entuber",
    storageBucket: "entuber.appspot.com",
    messagingSenderId: "431966848925",
    appId: "1:431966848925:web:db6b793ad21b88da409174",
    measurementId: "G-CXP8MYBDVF"
};
  
try{
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);    
    }
} catch (error) {
    console.log(error);
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={configureStore()}>
        <SafeAreaProvider>
          <MenuProvider> 
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <FlashMessage position="top" floating={true} renderFlashMessageIcon={() => <Thumbnail source={require('./assets/images/Icons/notification-banner.png')} />}/>
          </MenuProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
