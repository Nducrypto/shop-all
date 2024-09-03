import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import themes from '../../config/themes';
import {loaderStyles} from './loaderStyles';
import {ProductInterface} from 'src/hook/useProduct';

interface Props {
  size: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
  children: React.ReactNode;
  array: Partial<ProductInterface[]>;
}
const DataLoader = ({size, style, isLoading, children, array}: Props) => {
  const isArrayEmpty = !isLoading && !array.length;

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size={size}
          color={themes.COLORS.GRADIENT_START}
          style={style}
          testID="loading-spinner"
        />
      ) : isArrayEmpty ? (
        <Text style={loaderStyles.text}>Empty</Text>
      ) : (
        <Text>{children}</Text>
      )}
    </View>
  );
};

export default DataLoader;
