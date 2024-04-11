//ChannelListScreen.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../../AppContext";
import { ChannelList } from "stream-chat-expo";
import { chatUserId } from "../../chatConfig";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const ChannelListScreen = (props) => {
  const { setChannel, chatClient} = useAppContext();
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const filter = {members: { $in: ["nvkhang"] }};
    const sort = {
      last_message_at: -1,
    };
    const fetchChannels = async () => {

      const result = await chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
      result.map((channels) => {
        console.log(channels.data.name, channels.cid);
      });
    };

    fetchChannels();

  }, []);

  const [filters, setFilters] = useState({
    members: {
      $in: [chatUserId],
    }
  });
  const sort = {
    last_message_at: -1,
  };
  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      setFilters({
        ...filters,
        name: { $in: [searchTerm] },
      });
    } else {
      setFilters({
        members: {
          $in: [chatUserId],
        },
      });
    }
  };
  const handleSearchBarClick = () => {
    setSearch(true);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        placeholderTextColor="#fff"
        placeholder="Tìm kiếm"
        onChangeText={updateSearch}
        value={searchTerm}
        platform="android"
        leftIconContainerStyle={styles.iconContainer}
        rightIconContainerStyle={styles.iconContainer}
        inputContainerStyle={
          search ? styles.inputContainer : styles.inputContainerDefault
        }
        containerStyle={styles.containerSearch}
        onPressIn={handleSearchBarClick}
        onCancel={() => setSearch(false)}
      />
      {!search && (
        <ChannelList
          onSelect={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate("ChannelScreen");
          }}
          filters={filters}
          sort={sort}
        />
      )}
      {search && (
        <ChannelList
          onSelect={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate("ChannelScreen");
          }}
          filters={filters}
          sort={sort}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSearch: {
    backgroundColor: "#41ADFA",
    padding: 8,
  },
  inputContainerDefault: {
    borderRadius: 12,
    backgroundColor: "#41ADFA",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  iconContainer: {
    tintColor: "#fff",
  },
});

export default ChannelListScreen;
