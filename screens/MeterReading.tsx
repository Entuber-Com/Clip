import React from 'react'
import {View} from 'react-native';
import {Text, Grid, Col, Button} from 'native-base';
import { TextInput } from 'react-native-gesture-handler'

const MeterReading = (props: any) => {
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
            <Text>Submit your meter reading below by entering the 
                meter reading or taking a photo of your meter.</Text>
            <Text style={{fontWeight: '500'}}>Electric Meter #000000000636002210</Text>
            <Text>Your last meter reading: 93072 on 07/10/2020</Text>
            <Grid>
                <Col>
                    <TextInput></TextInput>
                </Col>
                <Col>
                    <Text> - or - </Text>
                </Col>
                <Col>
                    <Button>
                        <Text>Take Photo</Text>
                    </Button>
                </Col>
            </Grid>
            <Text style={{fontWeight: '500'}}>Gas Meter #000000000003358048</Text>
            <Text>Your last meter reading: 855 on 07/10/2020</Text>
            <Grid>
                <Col>
                    <TextInput></TextInput>
                </Col>
                <Col>
                    <Text> - or - </Text>
                </Col>
                <Col>
                <Button>
                        <Text>Take Photo</Text>
                    </Button>
                </Col>
            </Grid>
            <Button>
                        <Text>Submit Reading(s)</Text>
            </Button>
        </View>
    )
}

export default MeterReading
