import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import {Asset} from 'expo-asset';

export default class BillAnalytics extends Component<any,any> {
    constructor(props: any) {
        super(props);
        //STEP 2 - Chart Data
        const chartData = [
          { label: "Venezuela", value: "290" },
          { label: "Saudi", value: "260" },
          { label: "Canada", value: "180" },
          { label: "Iran", value: "140" },
          { label: "Russia", value: "115" },
          { label: "UAE", value: "100" },
          { label: "US", value: "30" },
          { label: "China", value: "30" }
        ];
        //STEP 3 - Chart Configurations
        const chartConfig = {
          type: "column2d",
          width: "100%",
          height: "400",
          dataFormat: "json",
          dataSource: {
            chart: {
              caption: "Countries With Most Oil Reserves [2017-18]",
              subCaption: "In MMbbl = One Million barrels",
              xAxisName: "Country",
              yAxisName: "Reserves (MMbbl)",
              numberSuffix: "K",
              theme: "fusion"
            },
            data: chartData
          }
        };
        this.state = chartConfig;

    }
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>A Column 2D Chart</Text>
    
            <View style={styles.chartContainer}>
           
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
    
        padding: 10
      },
    
      header: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 10
      },
    
      chartContainer: {
        height: 400,
        borderColor: "#000",
        borderWidth: 1
      }
    });