import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Card from '../../components/Card/Card';
import {width} from '../../constants/utils';
import {ProductInterface} from '../../components/recoilState/productState';
import {useNavigation} from '@react-navigation/native';
import {styles} from './cartStyle';
import globalStyle from '../../constants/globalStyle';
import CustomButton from '../../components/CustomButton/CustomButton';

interface Props {
  products: ProductInterface[];
  addToCart: any;
}
const ShoppedByOthers = ({products, addToCart}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={{marginBottom: 50}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
        Customers who shopped for items in your cart also shopped for:
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          minWidth: width,
        }}>
        {products.slice(0, 8).map((item, index) => (
          <View key={index} style={{marginTop: 30}}>
            <Card minHeight={194} maxWidth={width / 2.6} paddingLeft={4}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    ...item,
                  })
                }>
                <View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: item.image[0]}}
                      style={[styles.image, {width: width / 3}]}
                    />
                  </View>
                  <View>
                    <View
                      style={{
                        ...styles.productDescription,
                        paddingHorizontal: 8,
                      }}>
                      <Text style={styles.productTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View>
                        <Text
                          style={{
                            color: globalStyle.COLORS.GRADIENT_START,
                          }}>
                          ${Intl.NumberFormat().format(item?.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Card>
            <View>
              <CustomButton
                marginTop={9}
                title="ADD TO CART"
                width="100%"
                testID={`add-to-cart-button${index}`}
                onPress={() => addToCart(item)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShoppedByOthers;
