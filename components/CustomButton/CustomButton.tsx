import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/globalStyle';

interface Props {
  title: string | React.JSX.Element;
  width: any;
  onPress: any;
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
        testID={testID}
        style={{
          ...styles.button,
          width,
          marginTop,
          ...(disabled && {
            opacity: 0.5,
          }),
        }}
        onPress={onPress}
        disabled={disabled}>
        <Text style={{...styles.text, color: 'white'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
