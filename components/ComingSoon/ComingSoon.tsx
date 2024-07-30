import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To be implemented soon</Text>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: '600',
  },
});
