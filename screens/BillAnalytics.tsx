import { AppLoading } from "expo";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie, VictoryTheme, VictoryBar, VictoryChart } from "victory-native";
import CustomisedFlatList from "../components/CustomisedFlatList";
import { AppData } from "../constants/AppData";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";

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
            <Card>
            <VictoryPie
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
                    ]}
                />
            </Card>
            <Card>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 15 }}
                >
                <VictoryBar
                    barRatio={0.8}
                    style={{
                    data: { fill: "#c43a31" }
                    }}
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
                    ]}
                />
                </VictoryChart>
            </Card>
            <Card>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 15 }}
                >
                <VictoryBar
                    barRatio={0.8}
                    style={{
                    data: { fill: "#c43a31" }
                    }}
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
                    ]}
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
  },
});