import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import { MoreOptionsScreenData } from '../constants/ScreenData';

export default function MoreOptions(props: any) {
  const onItemPressed = (item: any) => {
    if (item.title === 'Enroll In Programs') {
        props.navigation.navigate('EnrollPrograms')
    }
    if (item.title === 'Safety Information') {
        props.navigation.navigate('SafetyInfo')
    }
    if (item.title === 'Push Notifications') {
        props.navigation.navigate('PushNotifications')
    }
    return;
  }

  return (
    <View style={styles.container}>
      <CustomisedFlatList array={MoreOptionsScreenData}
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
