import React from 'react';
import {Text, View} from 'react-native';
import {giftCardStyles} from './giftCardStyles';

const GiftCards = () => {
  return (
    <View style={giftCardStyles.container}>
      <Text style={giftCardStyles.title}>Gift Card Management Unavailable</Text>
      <Text style={giftCardStyles.message}>
        Our gift card management feature is currently under development and is
        not available at this time. We understand that this may be
        disappointing, and we apologize for any inconvenience this may cause. We
        are working hard to bring this feature to you as soon as possible. Thank
        you for your patience and understanding.
      </Text>
    </View>
  );
};

export default GiftCards;
