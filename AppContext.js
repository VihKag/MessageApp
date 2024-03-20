// AppContext.js

import React, { useState } from 'react';
import { StreamChat } from "stream-chat";
import { chatApiKey} from "./chatConfig";
// import { ChannelList } from 'stream-chat-expo';
// import ChannelListScreen from './screens/channels/ChannelListScreen';
export const AppContext = React.createContext({
  chatClient: null,
  loginUser: () => {},
  logout: () => {},
  switchUser: () => {},
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});
export const AppProvider = ({ children }) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();
  const [chatClient, setChatClient] = useState(null);

  const loginUser = (config) => {
    // implementation here
    const client = StreamChat.getInstance(chatApiKey);
    client.connectUser(config.user, config.token, (err) => {
      if (err) {
        console.error(err);
      } else {
        setChatClient(client);
      }
    });
  };

  const logout = () => {
    // implementation here
    setChatClient(null);
  };

  const switchUser = (userId) => {
    // implementation here
  };

  return (
    <AppContext.Provider
      value={{
        chatClient,
        loginUser,
        logout,
        switchUser,
        channel, 
        setChannel, 
        thread, 
        setThread 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => React.useContext(AppContext);
