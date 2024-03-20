import React from "react";
import { ChannelList } from "stream-chat-expo";
import { useAppContext } from "../../AppContext";

const ChannelListScreen = (props) => {
  const { setChannel } = useAppContext();
  const filters = {
    members: {
      '$in': ['nvkhang']
    },
  };
  const sort = {
    last_message_at: -1,
  };

  return (
    <ChannelList
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate('ChannelScreen');
      }}
      filters={filters}
      sort={sort}
    />
  );
};

export default ChannelListScreen;