import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FriendListItem from "../components/FriendListItem"; // Component hiển thị mỗi bạn bè trong danh sách
import { useAppContext } from "../AppContext";
import { Icon } from "react-native-elements";
import SearchComponent from "../components/SearchComponent";
const FriendListScreen = (props) => {
  const navigation = useNavigation();
  const { user, chatClient } = useAppContext();
  const [isSearching, setIsSearching] = useState(false);
  const handleViewFriendRequests = () => {
    props.navigation.navigate("FriendRequestListScreen"); // Tên của màn hình danh sách lời mời kết bạn trong Navigator của bạn
  };
  const renderItem = ({ item }) => <View></View>;
  const fetchData = async (searchTerm, setSearchResults) => {
    if (searchTerm && searchTerm !== "") {
      try {
        setSearchResults();
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SearchComponent
        chatClient={chatClient}
        currentUser={user}
        fetchData={fetchData}
        renderItem={renderItem}
        setIsSearching={setIsSearching}
      />
      <View style={styles.friendRequests}>
        <TouchableOpacity 
        onPress={handleViewFriendRequests}
        style={styles.btnFriendRequests}>
          <View style={styles.leftFriendRequests}>
            <View style={styles.iconRequest}>
              <Icon
                name="people-outline"
                type="ionicon"
                borderRadius={8}
                size={24}
                color={"#FFFFFF"}
              />
            </View>
            <Text style={styles.textRequest}>Lời mời kết bạn</Text>
          </View>
          <Text style={[styles.text_primary, styles.requestCount]}>{0}</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Lời mời kết bạn" onPress={handleViewFriendRequests} /> */}
      <FlatList
        data={user.friends}
        renderItem={({ item }) => <FriendListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconRequest: {
    backgroundColor: "#088AE8",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  friendRequests: {
    paddingHorizontal: 12,
    height: 40,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  btnFriendRequests: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftFriendRequests: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textRequest: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});
export default FriendListScreen;
