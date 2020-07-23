import React from 'react'
import { WebView } from 'react-native-webview';


const OutageMap = (props: any) => {
    return (
        <WebView
            source={{uri: 'https://stormcentral.cenhud.com/'}}
        />
    )
}

export default OutageMap
