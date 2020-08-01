import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import RadioButton from '../components/RadioButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Button } from 'native-base';
 

const DiagnoseOutage = (props: any)  => {
    const [selected, setSelected] = useState('');

    const setAlert = () => {
        if (selected === 'No') {
            Alert.alert('Alert','Please verify that you have reset the Fuses are Breakers before continuing.',[ { text: "OK", onPress: () => console.log("OK Pressed") }])
        } else if (selected === 'Yes') {
            Alert.alert('Alert','Thanks for reporting back the outage. We will get back to you immediately.',[ { text: "OK", onPress: () => console.log("OK Pressed") }])
        }
    }
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Text style={{fontSize: 20, margin: 20}}>Diagnose</Text>
                <Text style={{textAlign: 'left'}}>Have you reset your circuit breakers and/or checked your fuse box?</Text>
                
                <TouchableOpacity onPress={() =>
                    Alert.alert('Alert', 'To reset your breakers turn all the breakers all the way off including the main breaker. Wait ten seconds, then set all breakers to the on position one at a time, starting with the main breaker. If you have a fuse box, check to make sure all these fuses are in good working order.',[ { text: "OK", onPress: () => console.log("OK Pressed") }])
                }><Text style={{margin: 10, color: Colors.PRIMARY}}>What is this?</Text></TouchableOpacity>
             
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row', padding: 20}}>
                        <RadioButton
                            animation={'bounceIn'}
                            isSelected={selected === 'No'} 
                            onPress={() => {
                                setSelected('No');
                            }}
                        />
                        <Text style={{padding: 10}}>No</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 20}}>
                        <RadioButton
                            animation={'bounceIn'}
                            isSelected={selected === 'Yes'}
                            onPress={() => {
                                setSelected('Yes');
                            }}
                        />
                         <Text style={{padding: 10}}>Yes</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Button  large style={{ width:'100%', borderRadius: 50, backgroundColor: Colors.PRIMARY, justifyContent:'center'}} onPress={setAlert}>
                        <Text style={{color: 'white'}}>Continue</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default DiagnoseOutage
