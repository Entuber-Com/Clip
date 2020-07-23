import React from 'react'
import {ListItem, Text, Left, Body, Thumbnail} from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from './Card';
import { View } from 'react-native';


interface IProps {
    array: Array<any>
    onItemPressed?: (item: any) => void; 
}

const CustomisedFlatList = (props: IProps) => {
    const renderItem = ({ item }: any) => {
        return (
          <Item
            item={item}
            itemPressed={props.onItemPressed}
          />
        );
      };

    return (
        <FlatList data={props.array}  
            contentContainerStyle={{flexGrow: 1}}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
        />
    )
}

const Item = ({ item, itemPressed }: any) => (
    <Card style={{margin: 10}}>
        <TouchableOpacity>
            <ListItem noBorder={true} onPress={() => itemPressed(item)}>
                <Left>
                    <Thumbnail source={item.icon}/>
                    <Text style={{flexWrap: 'wrap'}}>{item.title}</Text>
                </Left>
            </ListItem>
            {
                item.description &&
                (<View style={{alignItems: 'center', paddingBottom: 15}}>
                    <Text note>{item.description}</Text>
                </View>)
            }
        </TouchableOpacity>
    </Card>
);

export default CustomisedFlatList
