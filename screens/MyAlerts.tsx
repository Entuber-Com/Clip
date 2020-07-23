import React, { useState } from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView, Switch} from 'react-native';
import {Text} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const MyAlerts = (props: any) => {
    const [toggleSwitch, setToggleSwitch] = useState(false);


    return (
        
        // <KeyboardAvoidingView
        //     behavior={Platform.OS == "ios" ? "padding" : "height"}
        //     style={{flex: 1}}
        // >
        //     <SafeAreaView style={{flex: 1}}>
        //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ backgroundColor: '#f1f1f1', padding: 10}}>
                    <View >
                        <Text style={[styles.meterTextHeader, {fontWeight: 'bold'}]}>By enabling Push Notifications, you are allowing CHUD to
                             send notifications straight to your device in regard to the following</Text>
                    </View>

                    <View style={ styles.row }>
                                <View style={ styles.bullet }>
                                    <Text>{'\u2022' + " "}</Text>
                                </View>
                                <View style={ styles.bulletText }>
                                    <Text>Bill Reminders</Text>
                                </View>
                            </View>
                            <View style={ styles.row }>
                                <View style={ styles.bullet }>
                                    <Text>{'\u2022' + " "}</Text>
                                </View>
                                <View style={ styles.bulletText }>
                                    <Text>Payment Posted</Text>
                                </View>
                            </View>
                            <View style={ styles.row }>
                                <View style={ styles.bullet }>
                                    <Text>{'\u2022' + " "}</Text>
                                </View>
                                <View style={ styles.bulletText }>
                                    <Text>Outage Status</Text>
                                </View>
                            </View>
                
                    <View style={{flexDirection: 'row', padding: 20, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Switch 
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                            trackColor={{true: 'green', false: 'grey'}}
                            thumbColor={toggleSwitch ? "#f1f1f1" : "#f1f1f1"}
                            onValueChange={(value: boolean) => setToggleSwitch(value)}
                            value={toggleSwitch}
                        />

                        <Text style={[styles.meterTextHeader, {marginLeft: 20}]}>{!toggleSwitch ? 'Enable' : 'Disable'} push notifications.</Text>
                   
                    </View>
                </View>
        //     </TouchableWithoutFeedback>
        //     </SafeAreaView>
        // </KeyboardAvoidingView>
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
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        marginVertical: 4,
        padding: 10
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1
    }

})

export default MyAlerts
