import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import {  safetyInfoScreenData } from '../constants/ScreenData';

export default function SafetyInformation(props: any) {
  const onItemPressed = (item: any) => {
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
