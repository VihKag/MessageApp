import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useAppContext } from "../AppContext";
import FriendRequestItem from "../components/FriendRequestItem"; // Component to display each friend request

const FriendRequestListScreen = () => {
  const { chatClient, user } = useAppContext();
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests when the screen is loaded
    const fetchFriendRequests = async () => {
      // Replace this with your logic to fetch friend requests
      const requests = user.friend_requests ? user.friend_requests : [];
      // console.log("FriendRequetListScreen line 15: " + requests);
      setFriendRequests(requests);
    };

    fetchFriendRequests();
  }, []);

  const handleAccept = async (requester) => {
    // Handle acceptance of the friend request
    const listRequest = user.friend_requests.filter(request => !(request.data.id === requester.data.id && request.data.recipient === requester.data.recipient));
    console.log(user.id);

    const friendlist = user.friends ? user.friends : [];
    const update = await chatClient.partialUpdateUsers([
      {
        id: user.id,
        set: {
          friends: [...friendlist, {id: requester.data.id, name: requester.data.name, email: requester.data.email}],
          friend_requests: listRequest,
        },
      },
      {
        id: requester.data.id,
        set: {
          friends: [...requester.data.friends ? requester.data.friends : [], {id: user.id, name: user.name, email: user.email}],
        },
      },
    ]);
  };

  const handleDecline = async (requester) => {
    // Handle decline of the friend request
    console.log(`Declined friend request from ${requester.name}`);
    const friendlist = user.friends ? user.friends : [];
    const update = await chatClient.partialUpdateUser({
      id: user.id,
      unset: [friend_requests.requester],
    });
  };

  return (
    <View>
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <FriendRequestItem
            requester={item}
            onAccept={() => handleAccept(item)}
            onDecline={() => handleDecline(item)}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default FriendRequestListScreen;
