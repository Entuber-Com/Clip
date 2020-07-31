import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import {  safetyInfoScreenData } from '../constants/ScreenData';
import { useIsFocused } from '@react-navigation/native';

export default function SafetyInformation(props: any) {
  const isFocused = useIsFocused();
  const onItemPressed = (item: any) => {
    if (isFocused) {
      return;
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
