import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import {  enrollScreenData } from '../constants/ScreenData';

export default function EnrollPrograms(props: any) {
  const onItemPressed = (item: any) => {
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
