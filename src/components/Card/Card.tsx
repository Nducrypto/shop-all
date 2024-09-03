import {View} from 'react-native';
import React from 'react';
import {cardStyles} from './cardStyles';

interface Props {
  children: React.ReactNode;
  maxWidth: number;
  minHeight: number;
  paddingLeft?: number;
}
const Card = ({children, maxWidth, minHeight, paddingLeft}: Props) => {
  return (
    <View style={{...cardStyles.card, maxWidth, minHeight, paddingLeft}}>
      {children}
    </View>
  );
};

export default Card;
