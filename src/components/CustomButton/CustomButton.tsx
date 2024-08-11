import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {customButtonStyles} from './customButtonStyles';

interface Props {
  title: string | React.JSX.Element;
  width: number;
  onPress: () => void;
  testID: string;
  marginTop?: number;
  disabled?: boolean;
}
const CustomButton = ({
  title,
  width,
  onPress,
  marginTop,
  testID,
  disabled,
}: Props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        testID={testID}
        style={{
          ...customButtonStyles.button,
          width,
          marginTop,
          ...(disabled && {
            opacity: 0.5,
          }),
        }}
        onPress={onPress}
        disabled={disabled}>
        <Text style={{...customButtonStyles.text, color: 'white'}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
