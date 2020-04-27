import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import { GiftedChat } from 'react-native-gifted-chat';

class Chatbot extends Component {

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }



  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'FAQ Bot',
          avatar: 'https://i.imgur.com/7k12EPD.png'
        }
      }
    ]
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

export default Chatbot;
