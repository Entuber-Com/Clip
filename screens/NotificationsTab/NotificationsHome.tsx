import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { View, ListItem, Left, Thumbnail, Text, Body, Right } from 'native-base'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import * as firebase from 'firebase';
import moment from 'moment'

export const NotificationsHome = () => {

    const notifications = useSelector((store: any) => store.notification.notifications)
    const isFocused = useIsFocused();
     
    useEffect(() => {
        let timer: any;
        if (isFocused) {
            const unreadNotifications = notifications.filter((data:any) => !data.Read) 
            timer = setTimeout(() => unreadNotifications.forEach((elem: any) => {
                firebase.database()
                .ref('Notification Fanout/ClientID/5KPoVKeO14afWztF9maifPTaf3h1/'+elem.id)
                .update({
                    Read: true,
                    ReadAt: new Date()
                })
                
            }), 2000);
        }
        return () => {
            clearTimeout(timer);
        }
    },[isFocused])
  
    const renderItem = ({ item }: any) => {
        return(
            <View style={{flex:1, flexDirection: 'row', padding: 20,borderBottomColor: '#ccc', borderBottomWidth: 1,backgroundColor: !item['Read'] ? '#e2e2e2' : '#f1f1f1'}}>
                <View style={{width: '25%', justifyContent:'center'}}>
                    <Thumbnail small source={require('../../assets/images/Icons/notification-bell.png')}/>
                </View>
                <View style={{width: '75%'}}>
                    <Text style={{flexWrap: 'wrap', fontWeight: 'bold'}}>{item['Headline'] || ''}</Text>
                    <Text note style={{flexWrap: 'wrap', color: 'black'}}>{item['Subheadline']|| ''}</Text>
                    <Text style={{flexWrap: 'wrap',  fontSize: 16, marginTop: 15}}>{item.Timestamp ? moment(moment.unix(item.Timestamp)).fromNow() : ''}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <FlatList contentContainerStyle={{flexGrow: 1}}
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
            
        </View>
    )
}
