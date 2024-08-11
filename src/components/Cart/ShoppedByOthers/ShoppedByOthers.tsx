import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import {wp} from '../../../config/appConfig.ts';
import {ProductInterface} from '../../../hook/useProduct.ts';
import {Product, CustomButton} from '../../';
import {shoppedStyles} from './shoppedStyles.ts';

interface Props {
  products: ProductInterface[];
  addToCart: (value: ProductInterface) => void;
}
const ShoppedByOthers = ({products, addToCart}: Props) => {
  return (
    <View style={shoppedStyles.container}>
      <Text style={shoppedStyles.shoppedText}>
        Customers who shopped for items in your cart also shopped for:
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={shoppedStyles.itemCon}>
        {products.slice(0, 8).map((item, index) => (
          <View key={index} style={shoppedStyles.item}>
            <Product product={item} style={{top: 10}} key={index} />
            <CustomButton
              marginTop={-19}
              title="ADD TO CART"
              width={wp('40%')}
              testID={`add-to-cart-button${index}`}
              onPress={() => addToCart(item)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShoppedByOthers;
