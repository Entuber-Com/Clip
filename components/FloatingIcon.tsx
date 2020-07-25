//This is an example code for React Native Floating Action Button//
import React, { Component, useMemo, useEffect, useState } from 'react';
//import react in our code.

import { StyleSheet, View, Image, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
//import all the components we are going to use.
import { GiftedChat } from "react-native-gifted-chat";
import { DirectLine } from "botframework-directlinejs";
import ReactWebChat, { createDirectLine } from 'botframework-webchat';



export const FloatingIcon = () => {
  //const directLine = useMemo(() => createDirectLine({ token: 'YOUR_DIRECT_LINE_TOKEN' }), []);
  const [token, setToken]=useState('');
  const [convoID, setconvoID]=useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://powerva.microsoft.com/api/botmanagement/v1/directline/directlinetoken?botId=36f6d902-a9cd-43c6-b595-9cd764fba32f&tenantId=2c6f0b1a-2a8d-46d7-8f02-95b9ba145ff8')
    .then(async (response: any) => {
      if (response.ok) {
        let json = await response.json();
        setToken(json.token),
        setconvoID(json.conversationId)
      }
    })

  }, [])
  
  const clickHandler = () => {
    //function to handle click on floating Action Button
    setModalVisible(true);
  };

  
    return (
      <View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
             source={{
                uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
          {
            token!=='' && convoID!==''  && modalVisible && <ChatScreen token={token}
              conversationId={convoID}
              setModalVisible={(event: boolean) => setModalVisible(event)}
              modalVisible={modalVisible}
            />
          }
      </View>
     
    );
  
}

// const directLine = new DirectLine({
//   secret: "YOUR_SECRET_GOES_HERE"
// });
const botMessageToGiftedMessage = (botMessage: any) => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: "React Native",
    avatar:
      "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
  }
});
function giftedMessageToBotMessage(message: any) {
  return {
    from: { id: 1, name: "John Doe" },
    type: "message",
    text: message.text
  };
}


class ChatScreen extends React.Component<any,any> {
 
  //directLine:any
  constructor(props: any) {
    super(props);
    this.state ={
      messages: []
    }
    
  /*   this.directLine = new DirectLine({
      token: this.props.token,
      conversationId: this.props.conversationId
    }); */
  }
  componentDidMount = () => {
  /*   this.directLine.activity$.subscribe((botMessage: any) => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
    }); */
  }
  onSend = (messages: any) => {
      this.setState({ messages: [...messages, ...this.state.messages] });
    /*   messages.forEach((message: any) => {
        this.directLine
          .postActivity({
            from: { id: 'myUserId', name: 'myUserName' }, // required (from.name is optional)
            type: 'message',
            text: message.text
        })
          .subscribe(() => console.log("success"), () => console.log("failed"));
      }); */
    };

  render() {
    return(
      <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.modalVisible}
              onRequestClose={() => {
                  this.props.setModalVisible(false);
              }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <GiftedChat
            user={{
              _id: 1
            }}
            messages={this.state.messages}
            onSend={this.onSend}
          />
            </View>
          </View>
        </Modal>
    )
  }

}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1
  }
});