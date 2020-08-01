import * as React from 'react';
import { StyleSheet, Linking } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import {  safetyInfoScreenData } from '../constants/ScreenData';
import { useIsFocused } from '@react-navigation/native';

export default function SafetyInformation(props: any) {
  const isFocused =useIsFocused();

  const onItemPressed = (item: any) => {
    if(!isFocused) {
      return;
    }
    if (item.title === 'Call Before You Dig') {
      props.navigation.navigate('WebView', {title: 'Call Before You Dig', webViewLink: 'https://www.cenhud.com/my-energy/safety/dig-safely/' });
      // Linking.openURL('https://www.rwater.com/water-quality/lead-drinking-water/protecting-public-health')
    }
    if (item.title === 'Natural Gas Safety') {
      props.navigation.navigate('WebView', {title: 'Natural Gas Safety', webViewLink: 'https://www.cenhud.com/my-energy/safety/natural-gas/' });
      // Linking.openURL('https://www.rwater.com/water-quality/lead-drinking-water/protecting-public-health')
    }
    if (item.title === 'Carbon Monoxide Safety') {
      props.navigation.navigate('WebView', {title: 'Carbon Monoxide Safety', webViewLink: 'https://www.cenhud.com/my-energy/safety/carbon-monoxide/' });
      // Linking.openURL('https://www.rwater.com/water-quality/lead-drinking-water/protecting-public-health')
    }
    return;
  }

  return (
    <View style={styles.container}>
      <CustomisedFlatList array={safetyInfoScreenData}
        onItemPressed={onItemPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  }
});
