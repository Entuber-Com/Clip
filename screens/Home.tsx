import React, { useState } from 'react' 
import { View} from 'react-native'
import { Card } from '../components/Card'
import {Text, Button,  Icon, ListItem, Left, Body, Right, Segment} from 'native-base';
import { AppData } from '../constants/AppData'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import SegmentedControlTab from "react-native-segmented-control-tab";
import TextTicker from 'react-native-text-ticker';
import PaymentModal from './PaymentModal';

const Home = (props: any) => {
    const [charges, setCharges] = useState<any>(AppData['Customer']['Usage']);
    const [paymentModalVisible, setPaymentModalVisible] = useState<boolean>(false);

    const onTabChange = (index: number, itemIndexNumber: number) => {
        let chargesDup = [...charges];
        chargesDup[itemIndexNumber]['Default'] = chargesDup[itemIndexNumber]['Options'][index] === '$' ? 'Dollars' : chargesDup[itemIndexNumber]['Options'][index];
        chargesDup[itemIndexNumber]['DefaultIndex'] = index;
        setCharges(chargesDup);
    }

    const getGreetingTime = (m: any) => {
        var g = null; //return g
        
        if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
        
        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 17 //24hr time to split the evening
        var currentHour = parseFloat(m.format("HH"));
        
        if(currentHour >= split_afternoon && currentHour <= split_evening) {
            g = "Good Afternoon";
        } else if(currentHour >= split_evening) {
            g = "Good Evening";
        } else {
            g = "Good Morning";
        }
        
        return g;
    }

    const renderItem = ({item , index}: any) => {

        return (
            <Card style={{margin: 10}}>
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 24}}>{item.Title || 'N/A'}</Text>
                    </View>
                    <View style={{borderRadius: 5, backgroundColor: '#f1f1f1', margin: 10, flexWrap: 'wrap',padding: 20, alignItems:'center'}}>
                        <Icon type={item.IconType} name={item.Icon} style={{color: '#ed7738'}}/>
                        <TextTicker
                            isRTL={false}
                            style={{  flexWrap: 'wrap' }}
                            duration={6000}
                            scrollSpeed={500}
                            loop
                            repeatSpacer={50}
                            marqueeDelay={0}
                        >
                            <Text style={{fontWeight: 'bold'}}>Daily Average:</Text> {item[item['Default']]['Daily'] || '$0'}
                        </TextTicker>
                    
                        <TextTicker
                            isRTL={false}
                            style={{  flexWrap: 'wrap' }}
                            duration={6000}
                            scrollSpeed={500}
                            loop
                            repeatSpacer={50}
                            marqueeDelay={0}
                        >
                            <Text style={{fontWeight: 'bold'}}>Total:</Text> {item[item['Default']]['Total'] || '$0'}
                        </TextTicker>
                        <SegmentedControlTab
                            tabStyle={{justifyContent: 'center', alignItems:'center', marginTop: 5}}
                            values={item['Options']}
                            selectedIndex={item['DefaultIndex']}
                            onTabPress={(indexNumber: number) => onTabChange(indexNumber, index)}
                        />
                    </View>
                    <View  style={{borderRadius: 5, backgroundColor: '#f1f1f1', margin: 10, flexWrap: 'wrap',padding: 20}}>
                        {/* <TextTicker
                            isRTL={false}
                            style={{  flexWrap: 'wrap' }}
                            duration={6000}
                            scrollSpeed={500}
                            loop
                            repeatSpacer={50}
                            marqueeDelay={0}
                            shouldAnimateTreshold={50}
                        > */}
                            <Text> <Icon type='Feather' style={{fontSize: 20, color: item['Change'].includes('-') ? 'green':'red'}} name={item['Change'].includes('-') ? 'arrow-down-circle' : 'arrow-up-circle'} />  <Text style={{fontSize: 22}}>{item['Change'] || '0%'}</Text> vs This Month Last Year</Text> 
                        {/* </TextTicker> */}
                    </View>
                </View>
            </Card>
        )
    }
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5, backgroundColor: '#3377bb', alignItems:'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight:'bold', color: '#fff', textAlign:"center", marginTop: 5}}>{getGreetingTime(moment())}</Text>
                <Card style={{backgroundColor: '#ed7738',padding:20, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 30, color: '#fff'}}>{AppData['Customer']['Charges'] || '$0'}</Text>
                    <Text style={{ color: '#fff'}}>{moment(new Date(AppData['Customer']['Date'])).format('ddd MMM D') || 'N/A'}</Text>
                    <Button bordered 
                        rounded
                        light
                        small
                        style={{marginTop:20, alignSelf: 'center', borderColor: '#fff'}}
                        onPress={() => props.navigation.navigate('ViewBill')}
                    >
                        <Text style={{fontSize: 10, color: '#fff'}}>View Bill PDF</Text>
                    </Button>
                    <Button
                        rounded
                        style={{
                            width: '50%',
                            marginTop:10,
                            backgroundColor:'white',
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => setPaymentModalVisible(true)}
                    >
                        <TouchableOpacity>
                            <Text style={{color: '#ed7738', fontSize: 20}}>Pay Bill</Text>
                        </TouchableOpacity>
                    </Button>
                </Card>
            </View>
            <View style={{flex: 0.5, alignItems:'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                <FlatList data={charges || []}
                    contentContainerStyle={{flexGrow:1}}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                />
            </View>
            <PaymentModal modalVisible={paymentModalVisible}
                setModalVisible={(event: boolean) => setPaymentModalVisible(event)}
            />
        </View>
    )
}

export default Home
