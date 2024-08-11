import {Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {paymentOptionsStyles} from './paymentOptionStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themes from '../..//config/themes';

const PaymentOptions = () => {
  const paymentMethods = [
    {id: 1, name: 'Pay Stack', icon: 'paypal'},
    {id: 2, name: 'Credit Card', icon: 'credit-card'},
    {id: 3, name: 'Apple Pay', icon: 'apple'},
    {id: 4, name: 'Google Pay', icon: 'google'},
  ];
  function handlePaymentMethodSelect(method: string) {
    Alert.alert(
      'Payment Method Unavailable',
      `${method} is currently not available. Please choose a different payment method.`,
      [{text: 'OK', style: 'default'}],
    );
  }

  return (
    <View style={paymentOptionsStyles.container}>
      <Text style={paymentOptionsStyles.header}>Select payment method</Text>
      {paymentMethods.map((method, index) => (
        <TouchableOpacity
          key={method.id}
          style={paymentOptionsStyles.paymentOption}
          onPress={() => handlePaymentMethodSelect(method.name)}
          activeOpacity={0.6}
          disabled={index === 0}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome
              name={method.icon}
              color="grey"
              size={themes.ICONS.SMALL}
              style={paymentOptionsStyles.icon}
            />
            <Text style={paymentOptionsStyles.optionText}>{method.name}</Text>
          </View>
          {index === 0 && (
            <FontAwesome
              name="check-circle"
              color={themes.COLORS.BUTTON_COLOR}
              size={themes.ICONS.SMALL}
              style={paymentOptionsStyles.icon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PaymentOptions;
