import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { OnlineIndicator } from "./OnlineIndicator";

const UserSearchResult = ({
  user,
  isFriend,
  onCall,
  onAddFriend,
  isCurrentUser,
}) => {
  if (isCurrentUser) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            />
          )}
          <View style={styles.onlineIndicator}>
            <OnlineIndicator online={user.online} />
          </View>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {isFriend ? (
        <TouchableOpacity style={styles.actionButton} onPress={onCall}>
          <Text style={styles.actionButtonText}>Gọi</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.actionButton} onPress={onAddFriend}>
          <Text style={styles.actionButtonText}>Kết bạn</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  onlineIndicator: {
    position: "absolute",
    right: 12,
    bottom: 0,
  },
});

export default UserSearchResult;
