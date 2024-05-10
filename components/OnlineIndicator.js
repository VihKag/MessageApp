import React from 'react';
import { View, StyleSheet,Text} from 'react-native';

export const OnlineIndicator = ({ online }) => {
  return (
    <View style={[styles.indicator, online ? styles.online : styles.offline]}>
      <View style={[styles.dot, online ? styles.onlineDot : null]} />
      <Text>{online ? "online" : "offline"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  online: {
    backgroundColor: 'transparent',
  },
  offline: {
    display:"none",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  onlineDot: {
    backgroundColor: '#4CD964',
  },
});

