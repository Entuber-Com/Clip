import React from 'react'
import {Accordion, Text, Grid, Col, Row, Icon, Left, Right, Body} from 'native-base';
import { AppData } from '../constants/AppData';
import { View } from 'react-native';

const PaymentHistory = (props: any) => {
    const renderHeader = (item: any, expanded: boolean) => {
        return(
            <View style={{
                backgroundColor: (AppData["Bill History"].findIndex((data: any) => JSON.stringify(data) === JSON.stringify(item)) % 2) !== 0 ? '#cccccc' : '#ffffff',
                padding: 20
            }}>
                <Grid>
                    <Col>
                        <Text>{item['Date'] || 'N/A'}</Text>
                    </Col>
                    <Col>
                        <Text>{item['Activity'] || 'N/A'}</Text>
                    </Col>
                    <Col>
                        <Text>
                            {item['Amount'] || 'N/A'}
                        </Text>
                    </Col>
                    <Col>
                        {
                            expanded ?     
                            <Icon type="MaterialIcons" name='keyboard-arrow-down' />
                            :
                            <Icon type="MaterialIcons" name='keyboard-arrow-right' />
                        }
                    </Col>
                </Grid>
            </View>
           
        )
    }

    const renderContent = (item: any) => {
        return (
            <Grid style={{
                backgroundColor: "#f1f1f1",
                padding: 10,
            }}>
                <Row>
                    <Col>
                        <Text style={{fontWeight: 'bold'}}>Created Date : </Text>
                    </Col>
                    <Col>
                        <Text>
                            {item['Details']['Created'] || 'N/A'}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={{fontWeight: 'bold'}}>Confirmation# : </Text>
                    </Col>
                    <Col>
                        <Text>
                            {item['Details']['ConfirmationID'] || 'N/A'}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={{fontWeight: 'bold'}}>Payment Method : </Text>
                    </Col>
                    <Col>
                        <Text>
                            {item['Details']['Payment_Method'] || 'N/A'}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={{fontWeight: 'bold'}}>Status : </Text>
                    </Col>
                    <Col>
                        <Text>
                            {item['Details']['Status'] || 'N/A'}
                        </Text>
                    </Col>
                </Row>
            </Grid>

          );
    }

    return (
        <View style={{flex: 1}}>
            <Accordion dataArray={AppData["Bill History"]} 
                renderHeader={renderHeader}
                renderContent={renderContent}
                expanded={0}
            />
        </View>
    )
}

export default PaymentHistory
