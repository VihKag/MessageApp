// Channel.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { useAppContext } from "../../AppContext";
import { Channel } from "stream-chat-expo";
import { MessageList, MessageInput, ChannelAvatar } from "stream-chat-expo";

const ChannelScreen = (props) => {
  const { navigation } = props;
  const { channel, setThread } = useAppContext();

  return (
    <View>
      <Channel channel={channel}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
           onPress={()=>navigation.goBack()}
          >
            <Image
              style={styles.tinyLogo}
              source={
                require("../../assets/back.png")
              }
            />
          </TouchableOpacity>
          <ChannelAvatar channel={channel} />
          <View style={styles.groupHeader}>
            <Text style={styles.channelName}>{channel.data.name}</Text>
            <Text style={styles.channelConnectivity}>{channel.data.name}</Text>
          </View>
        </View>
        <MessageList
          onThreadSelect={(message) => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate("ThreadScreen");
            }
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor:"#41ADFA",
  },
  channelName: {
    fontSize: 16,
    lineHeight: 16,
  },
  tinyLogo: {
    width: 24,
    height: 24,
    marginStart: 24,
    marginRight: 8,
  },
  channelConnectivity: {
    lineHeight:12,
    fontSize:12,
  },
  groupHeader: {
    marginStart: 16,
  }
});
export default ChannelScreen;
