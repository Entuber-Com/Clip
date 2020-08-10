import * as React from 'react';
import { StyleSheet,Image } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import { reportOutageScreenData } from '../constants/ScreenData';
import Colors from '../constants/Colors';
import { Icon,Grid, Col, Text, Thumbnail,  } from 'native-base';
import { AppData } from '../constants/AppData';
import RNPickerSelect from 'react-native-picker-select';
import { useIsFocused } from '@react-navigation/native';


export default function ReportOutage(props: any) {
  const isFocused = useIsFocused();

  const onItemPressed = (item: any) => {
    if(!isFocused) {
      return;
    }
    if (item.title === 'No Power' || item.title === 'Partial Power' || item.title === 'Full Power') {
      props.navigation.navigate('DiagnoseOutage', {title: item.title});
    }
    return;
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.1, backgroundColor: Colors.PRIMARY}}>
         
          <RNPickerSelect
                  value={AppData.Customer["Customer Address"]}
                  onValueChange={(value) => console.log(value)}
                  placeholder={{
                      label:'Customer Account',
                      value: null,
                      color: '#ccc'
                  }}
                  style={{
                    inputAndroid:{
                        color: '#fff',
                        alignItems:'center', 
                        justifyContent: 'center',
                        textAlign: 'center'
                    },
                    inputIOS:{
                        color: '#fff',
                        alignItems:'center', 
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: 20,
                        fontSize: 15
                    }
                }}
                  items={[
                      { 
                        label: `Account: ${AppData.Customer["Customer Number"]} - ${AppData.Customer["Customer Address"]}`,
                        value: AppData.Customer["Customer Address"],
                        color: 'black',
                        displayValue: true
                      }
                  ]}
          />
      </View>
      <View style={{flex: 0.9, backgroundColor: '#f1f1f1'}}>
        <CustomisedFlatList array={reportOutageScreenData}
            onItemPressed={onItemPressed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
