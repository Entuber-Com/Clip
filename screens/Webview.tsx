import React from 'react'
import { WebView } from 'react-native-webview';
import { View } from 'react-native';


const Webview = (props: any) => {
    return (
        <View style={{flex: 1}}>
            <WebView
                source={{uri: props.route.params.webViewLink }}
            />
        </View>
    )
}

export default Webview