import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import { MoreOptionsScreenData } from '../constants/ScreenData';

export default function MoreOptions() {
  return (
    <View style={styles.container}>
      <CustomisedFlatList array={MoreOptionsScreenData}
        //onItemPressed={console.log}
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
