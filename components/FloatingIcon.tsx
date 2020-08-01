//This is an example code for React Native Floating Action Button//
import React, { Component, useMemo, useEffect, useState } from 'react';
//import react in our code.

import { StyleSheet, View, Image, TouchableOpacity, Alert, Modal, Dimensions,Text } from 'react-native';
//import all the components we are going to use.
import { GiftedChat } from "react-native-gifted-chat";
import{Button, ListItem, Icon} from 'native-base';
import moment from 'moment';
// import { DirectLine } from "botframework-directlinejs";
// import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import HTMLView from 'react-native-htmlview';
import Colors from '../constants/Colors';

export const FloatingIcon = () => {
  //const directLine = useMemo(() => createDirectLine({ token: 'YOUR_DIRECT_LINE_TOKEN' }), []);
  const [token, setToken]=useState('');
  const [convoID, setconvoID]=useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  /* useEffect(() => {
    fetch('https://powerva.microsoft.com/api/botmanagement/v1/directline/directlinetoken?botId=36f6d902-a9cd-43c6-b595-9cd764fba32f&tenantId=2c6f0b1a-2a8d-46d7-8f02-95b9ba145ff8')
    .then(async (response: any) => {
      if (response.ok) {
        let json = await response.json();
        setToken(json.token),
        setconvoID(json.conversationId)
      }
    })

  }, []) */
  
  const clickHandler = () => {
    //function to handle click on floating Action Button
    setModalVisible(true);
  };

  
    return (
      <View>

      <TouchableOpacity>
      <Button
        activeOpacity={0.7}
        onPress={clickHandler}
        style={styles.TouchableOpacityStyle}
        >

              <Image
                //We are making FAB using TouchableOpacity with an image
                //We are using online image here
                source={require('../assets/images/Icons/Dog_Face.png')}
                //You can use you project image Example below
                //source={require('./images/float-add-icon.png')}
                style={styles.FloatingButtonStyle}
              />
      </Button>
          </TouchableOpacity>
        {
          modalVisible && <ChatScreen token={token}
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


class ChatScreen extends React.PureComponent<any,any> {
  timer: any;
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

  IDGen = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  onSend = (messages: any) => {
    this.setState((previousState: any) => {
      return {
          messages: GiftedChat.append(previousState.messages, messages).sort((a: any, b: any) => moment(a.createdAt).diff(moment(b.createdAt)))
      }
    }, () => {
      let newMessage: any = []
      if (messages.find((message: any) => message.text && ['hi','hello','hey'].includes(message.text.toLowerCase()))) {
        newMessage = [
          
          {
            _id: `${this.IDGen()}_1`,
            createdAt: moment(),
            text: 'Hi! I’m Tara. I can help with account questions, work orders, store information, and more.',
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          },
          {
            _id: `${this.IDGen()}_2`,
            createdAt: moment().add(5, 'milliseconds'),
            text: 'If you’d like to speak to a human agent, let me know at any time.',
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          },
          {
            _id: `${this.IDGen()}_3`,
            createdAt: moment().add(5, 'milliseconds'),
            text: 'So, what can I help you with today?',
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          },
        ]
      }

      if (messages.find((message: any) => message.text && ['talk to a person','agent'].includes(message.text.toLowerCase()))) {
        newMessage = [
          
          {
            _id: this.IDGen(),
            createdAt: moment(),
            text: `To connect with a person now, click on the following link: <a href="https://chat.cenhud.com/hppcwis.dll?varUserRequest=REQ_WEBCHAT_MAIN&varUserLanguage=english&varBusinessUnitName=DEFAULT">Agent</a>`,
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          }
        ]
      }
      if (messages.find((message: any) => message.text && ['gas leak','leak'].includes(message.text.toLowerCase()))) {
        newMessage = [
          
          {
            _id: `${this.IDGen()}_1`,
            createdAt: moment(),
            text: `<span>Natural gas is colorless and odorless, so an odorant called mercaptan, which has a rotten egg smell, is added for easier detection in the event of a gas leak.<span>
<span>If you suspect a natural gas leak,<strong> STOP. GO. LET US KNOW.</strong><span>
<ul>
<li><strong>STOP</strong> what you are doing. Do not light or use a match. Don’t turn lights on or off or use a flashlight, cell phone or telephone. Don’t turn on any other appliance or electric/electronic device and please do not flush or run water.</li>
<li><strong>GO</strong> outside immediately and</li>
<li><strong>LET US KNOW</strong> by calling the gas odor hotline at 800-942-8274. Or, call 9-1-1. A representative will come to your location and check for potential leaks or faulty appliances.</li></ul>
<span><strong>This 800 number can only be used to report gas leaks.</strong></span>
            `,
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          },
          {
            _id: `$this.IDGen()_2`,
            createdAt: moment().add(5, 'milliseconds'),
            text: `Thank You.`,
            user: {
              _id: 2,
              name: "Tara",
              avatar:
                require('../assets/images/Icons/Dog_Face.png')
            }
          }
        ]
      }
      if(newMessage.length>0)
        {
          this.timer = setTimeout(() => {
            this.setState((previousState: any) => {
              return {
                  messages: GiftedChat.append(previousState.messages, newMessage).sort((a: any, b: any) => moment(a.createdAt).diff(moment(b.createdAt)))
              }
            })
          }, 1000);
        }
      
    });
      
    
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

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  renderMessage =(event: any) => {
    return (
      <View style={{padding: 10}}>
        {event.currentMessage.user._id === 1 ? 
        <Text style={{color: 'white'}}>{event.currentMessage.text}</Text>
        :
        <HTMLView
          value={event.currentMessage.text}
        />}
      </View>
    )
  } 
  render() {
    return(
      <Modal
              animationType="slide"
              presentationStyle = 'fullScreen'
              // transparent={true}
              visible={this.props.modalVisible}
              onRequestClose={() => {
                  this.props.setModalVisible(false);
              }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <ListItem onPress = {() => {this.props.setModalVisible(false);}} style = {{justifyContent: "flex-end", alignItems: "flex-end",}}>
              <Icon type = 'AntDesign' name = 'closecircleo'></Icon>
            </ListItem>
              <GiftedChat
                user={{
                  _id: 1
                }}
                messages={this.state.messages}
                onSend={this.onSend}
                inverted={false}
                renderMessageText={this.renderMessage}
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
    // position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY
    // right: 20,
    // bottom: 5,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 40,
    height: 40
    // opacity: 0.5
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    //margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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