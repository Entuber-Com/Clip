import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import {  enrollScreenData } from '../constants/ScreenData';
import { useIsFocused } from '@react-navigation/native';

export default function EnrollPrograms(props: any) {
  const isFocused = useIsFocused()
  const onItemPressed = (item: any) => {
    if (!isFocused) {
      return;
    }
    return;
  }

  return (
    <View style={styles.container}>
      <CustomisedFlatList array={enrollScreenData}
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
