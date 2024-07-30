import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {Card} from '../index';
import {width} from '../../constants/utils';
import {screen} from '../../constants/screens';

interface Props {
  product?: any;
  horizontal?: any;
  full?: any;
  style?: any;
  priceColor?: any;
  imageStyle?: any;
}
const Product = ({product, horizontal, full, style}: Props) => {
  const navigation = useNavigation<any>();

  const proceedToProductDetail = () => {
    navigation.navigate(screen.productDetail, {
      ...product,
    });
  };

  const imageStyles = [
    full
      ? styles.fullImage
      : horizontal
      ? styles.horizontalImage
      : styles.image,
  ];

  return (
    <View style={styles.container}>
      <Card minHeight={120} maxWidth={width} paddingLeft={0}>
        <View
          style={[
            {...styles.product, flexDirection: horizontal ? 'row' : 'column'},
            styles.shadow,
          ]}>
          <TouchableWithoutFeedback
            onPress={proceedToProductDetail}
            testID="proceed-to-product-detail-button">
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image source={{uri: product?.image[0]}} style={imageStyles} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={proceedToProductDetail}>
            <View style={styles.productDescription}>
              <Text
                style={{
                  ...styles.productTitle,
                  ...(style && {
                    marginTop: style.top,
                  }),
                }}
                numberOfLines={2}>
                {product?.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'grey',
                  fontWeight: '500',
                  ...(style && {
                    marginBottom: style.top,
                    marginTop: style.top,
                  }),
                }}>
                ${product?.price}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </View>
  );
};

export default Product;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 27,
  },
  product: {
    borderWidth: 0,
  },
  productTitle: {
    fontWeight: 'bold',
    paddingBottom: 6,
    fontSize: 14,
    color: 'black',
  },
  productDescription: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    elevation: 1,
    flex: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 8,
    marginTop: -20,
    height: 120,
    width: 'auto',
  },
  horizontalImage: {
    height: 130,
    width: 'auto',
    marginTop: -32,
    marginHorizontal: 8,
  },
  fullImage: {
    height: 215,
    width: width - 16 * 3,
    marginTop: -27,
    marginHorizontal: 8,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
});
