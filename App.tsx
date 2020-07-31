import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { MenuProvider } from 'react-native-popup-menu';

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
          </MenuProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
