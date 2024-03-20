// Channel.js
import React from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../../AppContext";
import { Channel } from "stream-chat-expo";
import { MessageList, MessageInput } from "stream-chat-expo";

const ChannelScreen = (props) => {
  const { navigation } = props;
  const { channel, setThread } = useAppContext();

  return (
    <View>
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={(message) => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate('ThreadScreen');
            }
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
};

export default ChannelScreen;