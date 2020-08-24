import { AppLoading } from "expo";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie, VictoryTheme, VictoryBar, VictoryChart,VictoryLegend, VictoryLabel } from "victory-native";
import CustomisedFlatList from "../components/CustomisedFlatList";
import { AppData } from "../constants/AppData";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import {Text} from 'native-base';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function BillAnalytics(props: any) {


  return (
    <View style={styles.container}>
        <ScrollView>
            <Card style={{margin: 10, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>Bill Breakdown</Text>
            <VictoryPie
                    innerRadius={50}
                    width={300}
                    colorScale={['#ed7738','#3377bb','#333333','#cccccc','#652d88','#658636']}
                    data={AppData["Bill Breakdown"]}
                    x='Percent'
                    y='PercentValue'
                />
                <VictoryLegend 
                  x={100} y={50}
                  orientation="vertical"
                  gutter={20}
                  colorScale={['#ed7738','#3377bb','#333333','#cccccc','#652d88','#658636']}
                  data={AppData["Bill Breakdown"].map((data: any) => ({
                    name: data.Type
                  }))}
                />
            </Card>
            <Card style={{margin: 10, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>Electric Usage</Text>
          
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 30 }}
                padding={80}
                >
                <VictoryBar
                    barRatio={0.8}
                    labels={["Average Daily kWh Usage"]}
                    style={{ data: { fill: (data: any) => (data.datum.Month !== 'August' ? "#ccc" : "#3377bb") } }}
                    data={AppData["Bill Usage"].Electric}
                    x='Month'
                    y='Usage'
                    labelComponent={<VictoryLabel angle={90} x={20} y={200}/>}
                />
                </VictoryChart>
            </Card>
            <Card style={{margin: 10,padding: 20, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>Gas Usage</Text>
          
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 30 }}
                padding={80}
                >
                <VictoryBar
                    barRatio={0.8}
                    labels={["Average Daily thm Usage"]}
              
                    style={{ data: { fill: (data: any) =>  (data.datum.Month !== "August" ? "#ccc" : "#3377bb") } }}
                    data={AppData["Bill Usage"].Gas}
                    x='Month'
                    y='Usage'
                    labelComponent={<VictoryLabel angle={90} x={20} y={200}/>}
                />
                </VictoryChart>
            </Card>
        </ScrollView>
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 10
  },
});