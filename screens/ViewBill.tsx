import React from 'react'
import { View, Dimensions, StyleSheet , Text} from 'react-native';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FileSystem } from 'expo';
import Colors from '../constants/Colors';
import { Button } from 'native-base';
/* import PDFReader from 'rn-pdf-reader-js'
import { Asset } from 'expo-asset'; */

const ViewBill = () => {
    return (
        <View style={{flex: 1}}>
            <WebView  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/entuber.appspot.com/o/demoData%2FM%20Water%20Bill%20print.pdf?alt=media&token=fcf217f5-015a-4e2c-a4a0-59b99959d154'}}/>
         {/*     <PDFReader
                style={styles.pdf}
                source={{uri: Asset.fromModule(require('../assets/PDF/Bill_July_MDC.pdf')).uri}}
            /> */}
        </View>
    )
}

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
 */
export default ViewBill
