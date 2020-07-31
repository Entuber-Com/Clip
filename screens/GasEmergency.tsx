import React, { useState } from 'react'
import {View, StyleSheet,  Linking} from 'react-native';
import {Text, Grid, Col, Button, Row,Icon} from 'native-base';

const GasEmergency = (props: any) => {

    return (
            <View style={{flex: 1, padding: 20, justifyContent:'center', flexGrow: 1}}>
          
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={styles.meterTextHeader}>Don't Panic, Act Quickly.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 10}}>
                        <Text>1.
                        <Text style={styles.meterTextBold}>STOP</Text>
                        <Text style={styles.meterText}> what you are doing. Do not light or use a match.Do not turn lights on or off or</Text>
                        <Text style={styles.meterText}>use a flashlight, cellphone or telephone. Do not turn on any other appliance or electric/electronic device and do not flush or run water</Text>
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <Text>2.
                        <Text style={styles.meterTextBold}>GO</Text>
                        <Text style={styles.meterText}> outside immediately</Text>
                        </Text>
                    </View>
                  
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Button  style={{width: '75%', borderRadius: 5, backgroundColor: 'red',justifyContent: 'center',alignItems:'center', borderColor: '#0000FF', borderWidth: 2}}
                            onPress={() => Linking.canOpenURL('tel:203-562-4020')
                            .then((supported: any) => {
                              if (supported) {
                                return Linking.openURL('tel:1-800-436-7734')
                                  .catch(() => null);
                              }
                            })}
                        >
                            <Text style={{color:'white'}}>Call Now</Text>
                        </Button>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Button  style={{width: '75%',  borderRadius: 5, backgroundColor: 'red',justifyContent: 'center',alignItems:'center', borderColor: '#0000FF', borderWidth: 2}}
                            onPress={() => Linking.canOpenURL('tel:203-562-4020')
                            .then((supported: any) => {
                              if (supported) {
                                return Linking.openURL('tel:911')
                                  .catch(() => null);
                              }
                            })}
                        >
                            <Text style={{color:'white'}}>Call 9-1-1</Text>
                        </Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.meterText}>After making your report, a representative will come to your location and check for potential leaks or faulty appliances.</Text>
                    </View>
            </View>
    )
}

const styles = StyleSheet.create({
    meterTextHeader: {
        fontSize: 24,
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

export default GasEmergency
