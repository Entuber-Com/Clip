import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Dimensions } from "react-native";
import { AppData } from "../constants/AppData";
import moment from 'moment';
import { Grid, Row, Col, ListItem } from "native-base";
import RNPickerSelect from 'react-native-picker-select';

const PaymentModal = (props: any)  => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ListItem style={{justifyContent:'center'}}>
              <Text style={{fontSize: 24}}>Make a Payment</Text>
            </ListItem>
            <Grid>
              <Row>
                <Col style={{justifyContent:'center'}}>
                  <Text>Amount</Text>
                </Col>
                <Col style={{justifyContent:'center'}}>
                  <Text style={{fontSize: 16, color: '#3377bb',...styles.modalText}}>{AppData.Customer.Charges}</Text>
                </Col>
              </Row>
              <Row>
                <Col style={{justifyContent:'center'}}>
                  <Text>Payment Date:</Text>
                </Col>
                <Col style={{justifyContent:'center'}}>
                  <Text style={{fontSize: 16, color: '#3377bb',...styles.modalText}}>{moment().format('MM/DD/YYYY')}</Text>
                </Col>
              </Row>
              <Row>
                <Col style={{justifyContent:'center'}}>
                  <Text>Payment Mode:</Text>
                </Col>
                <Col style={{justifyContent:'center'}}>
                <RNPickerSelect
                      onValueChange={(value) => console.log(value)}
                      placeholder={{
                        label:'Payment Mode',
                        value: null,
                        color: '#ccc'
                      }}
                      items={[
                          { label: 'Apple Pay', value: 'Apple Pay', key: 'Apple Pay' },
                          { label: 'Google Pay', value: 'Google Pay', key: 'Google Pay' },
                          { label: 'Kubra', value: 'Kubra', key: 'Kubra' },
                      ]}
                  />
                </Col>
              </Row>
            </Grid>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                Alert.alert("Payment Done!");
                props.setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Make Payment</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              underlayColor='#ed7738'
              onPress={() => {
                props.setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/2,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 1
    },
    openButton: {
      margin: 5,
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      // marginBottom: 15,
      textAlign: "center"
    }
  });

export default PaymentModal
