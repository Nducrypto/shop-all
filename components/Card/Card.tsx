import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  maxWidth: number;
  minHeight: number;
  paddingLeft?: number;
}
const Card = ({children, maxWidth, minHeight, paddingLeft}: Props) => {
  return (
    <View style={{...styles.card, maxWidth, minHeight, paddingLeft}}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    justifyContent: 'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
