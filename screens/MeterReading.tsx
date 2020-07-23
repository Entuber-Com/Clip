import React, { useState } from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView} from 'react-native';
import {Text, Grid, Col, Button, Row} from 'native-base';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'

const MeterReading = (props: any) => {
    const [electricMeterInput, setElectricMeterInput] = useState('')
    const [gasMeterInput, setGasMeterInput] = useState('')

    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <SafeAreaView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ backgroundColor: '#f1f1f1', padding: 10,justifyContent: 'flex-end'}}>
                    <View >
                        <Text style={styles.meterTextHeader}>Submit your meter reading below by entering the 
                            meter reading or taking a photo of your meter.</Text>
                        <Text style={styles.meterTextBold}>Electric Meter #000000000636002210</Text>
                        <Text style={styles.meterText}>Your last meter reading: 93072 on 07/10/2020</Text>
                    </View>
                
                    <View style={{flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setElectricMeterInput(text)}
                            value={electricMeterInput}
                        ></TextInput>
                        <Text> - or - </Text>
                        <Button style={{borderRadius: 5, backgroundColor: '#3377bb'}}
                            onPress={() => props.navigation.navigate('MeterReadingCamera')}
                        >
                            <Text style={{color:'white'}}>Take Photo</Text>
                        </Button>
                    </View>


                    <View >
                        <Text style={styles.meterTextBold}>Gas Meter #000000000003358048</Text>
                        <Text style={styles.meterText}>Your last meter reading: 855 on 07/10/2020</Text>
                    </View>
                    <View style={{flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setGasMeterInput(text)}
                            value={gasMeterInput}
                        ></TextInput>
                        <Text> - or - </Text>
                        <Button style={{borderRadius: 5, backgroundColor: '#3377bb'}}
                         onPress={() => props.navigation.navigate('MeterReadingCamera')}
                        >
                            <Text style={{color:'white'}}>Take Photo</Text>
                        </Button>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                        <Button style={{borderRadius: 5, backgroundColor: '#3377bb',justifyContent: 'center',alignItems:'center'}}
                        >
                            <Text style={{color:'white'}}>Submit Reading(s)</Text>
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    meterTextHeader: {
        margin: 5,
    },
    meterText: {
        margin: 5
    },
    meterTextBold: {
        margin: 5,
        fontWeight: 'bold'
    }

})

export default MeterReading
