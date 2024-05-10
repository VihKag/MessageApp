import React, { useState } from "react";
import { View, Button, StyleSheet,TouchableOpacity,Animated } from "react-native";
import { useAppContext } from "../../AppContext";
import { ChannelList} from "stream-chat-expo";
import { chatUserId } from "../../chatConfig";
import { CustomPreviewTitle } from "../../components/PreviewTitle";
import SearchComponent from "../../components/SearchComponent";
import UserSearchResult from "../../components/UserSearchResults";
import { CustomeListItem } from "../../components/CustomeListItem";
import { handleAddFriend } from "../../api/useUser";

const ChannelListScreen = (props) => {
  
  const { chatClient, setChannel, user: currentUser,channelList } = useAppContext();
  console.log("user current is "+ currentUser);
  const filter = { members: { $in: [chatUserId] } };
  const sort = [{ last_message_at: -1 }];
  const [isSearching, setIsSearching] = useState(false);
  const navigateToFriendListScreen = () => {
    props.navigation.navigate("FriendListScreen");
  };

  const fetchUsers = async (searchTerm, setSearchResults) => {
    if (searchTerm && searchTerm !== "") {
      try {
        const response = await chatClient.queryUsers({
          name: { $autocomplete: searchTerm },
        });
        setSearchResults(response.users);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  const handleAddFriendWrapper = (user) => {
    handleAddFriend(currentUser, user, chatClient);
  };
  const isFriend = (user) => {
    if(currentUser.friends){
      const friendIds = currentUser.friends.map((friend) => friend.id);
    console.log("friends : "+friendIds);
    return friendIds.includes(user.id);
    }else{
      return false;
    }
  };

  const isCurrentUser = (user) => {
    return user.id === currentUser.id;
  };

  const renderItem = ({ item }) => (
    <UserSearchResult
      user={item}
      isFriend={isFriend(item)}
      isCurrentUser={isCurrentUser(item)}
      onCall={() => handleCall(item)}
      // onAddFriend={() => handleAddFriend(item)}
      onAddFriend={() => handleAddFriendWrapper(item)}
    />
  );

  return (
    <View style={styles.container}>
      <SearchComponent
        chatClient={chatClient}
        currentUser={currentUser}
        fetchData={fetchUsers}
        renderItem={renderItem}
        setIsSearching={setIsSearching}
      />
      {!isSearching && (
        <ChannelList
          onSelect={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate("ChannelScreen");
          }}
          filters={filter}
          sort={sort}
          PreviewTitle={CustomPreviewTitle}
          Preview={CustomeListItem}
        />
      )}

      <Button
        title="Xem danh sách bạn bè"
        onPress={navigateToFriendListScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChannelListScreen;
