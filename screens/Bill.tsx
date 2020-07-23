import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import CustomisedFlatList from '../components/CustomisedFlatList';
import { BillScreenData } from '../constants/ScreenData';
import { Text, Button} from 'native-base';
import moment from 'moment';
import { AppData } from '../constants/AppData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function Bill(props: any) {
    const onItemPressed = (item: any) => {
        if (item.title === 'Payment History') {
            props.navigation.navigate('PaymentHistory')
        }
        if (item.title === 'Submit Meter Reading') {
            props.navigation.navigate('MeterReading')
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.PRIMARY}}>
                <Text style={{fontSize: 30,color: '#fff'}}>{AppData['Customer']['Charges'] || '$0'}</Text>
                <Text style={{color: '#ffffff'}}></Text>
                <Text note style={{color: '#ffffff'}}>You are {moment(new Date('08/10/2020')).diff(moment(),'days')} days into your billing period</Text>
                <Text note style={{color: '#ffffff'}}>Next Meter Reading Date: 08/10/2020</Text>
                <Button bordered 
                    rounded
                    light
                    small
                    style={{marginTop:20, alignSelf: 'center', borderColor: '#fff'}}
                    onPress={() => props.navigation.navigate('ViewBill')}
                >
                    <Text style={{fontSize: 10, color: '#fff'}}>View Bill PDF</Text>
                </Button>
                <Button
                   rounded
                   style={{
                    width: '50%',
                    marginTop:10,
                    backgroundColor:'white',
                    alignSelf: 'center',
                    justifyContent: 'center'
                   }}
                >
                    <TouchableOpacity>
                        <Text style={{color: '#3377bb', fontSize: 20}}>Pay Bill</Text>
                    </TouchableOpacity>
                </Button>
            </View>
            <View style={{flex: 0.5, backgroundColor: '#f1f1f1'}}>
                <CustomisedFlatList array={BillScreenData}
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
