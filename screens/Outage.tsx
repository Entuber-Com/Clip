import * as React from 'react';
import { StyleSheet,Image } from 'react-native';

import { View } from '../components/Themed';
import CustomisedFlatList from '../components/CustomisedFlatList';
import { OutageScreenData } from '../constants/ScreenData';
import Colors from '../constants/Colors';
import { Icon,Grid, Col, Text, Thumbnail,  } from 'native-base';
import { AppData } from '../constants/AppData';
import TextTicker from 'react-native-text-ticker';
import RNPickerSelect from 'react-native-picker-select';


export default function Outage(props: any) {
  const onItemPressed = (item: any) => {
    if (item.title === 'View Outage Map') {
      props.navigation.navigate('OutageMap');
    }
    return;
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.4, backgroundColor: Colors.PRIMARY}}>
          {/* <TextTicker
            isRTL={false}
            style={{  fontSize: 24, flexWrap: 'wrap', color: 'white', marginBottom: 5, marginTop: 5 }}
            duration={6000}
            scrollSpeed={500}
            loop
            repeatSpacer={50}
            marqueeDelay={0}
          > */}
            {/* <Text></Text><Icon type="Entypo" name="location-pin" />{AppData.Customer["Customer Addtess"]}  */}
          {/* </TextTicker> */}

          <RNPickerSelect
                  value={AppData.Customer["Customer Addtess"]}
                  onValueChange={(value) => console.log(value)}
                  placeholder={{
                      label:'Customer Account',
                      value: null,
                      color: '#ccc'
                  }}
                  style={{
                      inputAndroid:{
                          color: '#fff'
                      },
                      inputIOS:{
                          color: '#fff'
                      }
                  }}
                  items={[
                      { 
                        label: `Account: ${AppData.Customer["Customer Number"]} - ${AppData.Customer["Customer Addtess"]}`,
                        value: AppData.Customer["Customer Addtess"],
                        color: 'black',
                        displayValue: true
                      }
                  ]}
          />
          <Grid>
            <Col style={{justifyContent: 'center', padding: 10}}>
              <Text style={{flexWrap: 'wrap', color: 'white', marginBottom: 5}}>To report a gas emergency/downed powerline, call us</Text>
              <Text style={{flexWrap: 'wrap', color: 'white', fontWeight: 'bold'}}><Icon type="FontAwesome" name="phone" style={{fontSize:14, color: 'white'}}/> 1-800-942-8274</Text>
              <Text style={{flexWrap: 'wrap', color: 'white', marginBottom: 5}}>or call 911</Text>
            </Col>
            <Col style={{justifyContent: 'center'}}>
              <Thumbnail source={require('../assets/images/Icons/No_Outage.png')} square large style={{width: '100%'}}/>
            </Col>
          </Grid>
      </View>
      <View style={{flex: 0.6, backgroundColor: '#f1f1f1'}}>
        <CustomisedFlatList array={OutageScreenData}
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
