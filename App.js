//App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider,useAppContext } from "./AppContext";
import { useChatClient } from "./useChatClient";
import ChannelListScreen from "./screens/channels/ChannelListScreen";
import ChannelScreen from "./screens/channels/ChannelScreen";
import ThreadScreen from "./screens/threads/ThreadScreen";
import { 
  Chat, 
  OverlayProvider,
} from "stream-chat-expo"; 
  import { StreamChat } from "stream-chat";
  import { chatApiKey} from './chatConfig';
const Stack = createStackNavigator();

const NavigationStack = () => {
  const { clientIsReady } = useChatClient();
  const chatClient = StreamChat.getInstance(chatApiKey);
  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="ChannelList" component={ChannelListScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
};