import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FriendRequestItem = ({ requester, onAccept, onDecline }) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: requester.data.image }} style={styles.avatar} /> 
      <Text style={styles.name}>{requester.data.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Text style={styles.buttonText}>Chấp nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
          <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  acceptButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#4CD964',
    borderRadius: 5,
  },
  declineButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default FriendRequestItem;
