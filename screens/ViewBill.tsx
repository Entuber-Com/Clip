import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'
import { Asset } from 'expo-asset';

const ViewBill = () => {
    return (
        <View style={styles.container}>
             <PDFReader
                style={styles.pdf}
                source={{uri: Asset.fromModule(require('../assets/PDF/Bill_July_CHUD.pdf')).uri}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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

export default ViewBill
