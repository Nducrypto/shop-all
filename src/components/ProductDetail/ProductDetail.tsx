import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {wp} from '../../config/appConfig';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomButton} from '../index';
import {addProductToCart} from '../../actions/cartAction';
import {useCartState} from '../../hook/useCart';
import {ProductInterface} from '../../hook/useProduct';
import {useSnackBarState} from '../../hook/useSnackbar';
import LinearGradient from 'react-native-linear-gradient';
import {screenNames} from '../../screen/screenNames';
import {productDetailStyles} from './productDetailStyles';
import {NavigationProps} from '../..//screen';
import themes from '../../config/themes';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState<string>('2XL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation<NavigationProps>();
  const {params} = useRoute();
  const product = params as ProductInterface;
  const {cartItems, setCart, savedForLaterItems} = useCartState();
  const {setSnackBar} = useSnackBarState();

  function handleAddToCart() {
    if (isItemInCart()) {
      Alert.alert('Item already in cart');
      return;
    }
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const data = {
      ...product,
      quantity: quantity,
      totalPrice: totalPrice,

      date: new Date().toString(),
      selectedSize,
    };
    addProductToCart(data, setCart, setSnackBar);
  }

  function isItemInCart() {
    const foundItem =
      cartItems.find(data => data.productId === product?.productId) ||
      savedForLaterItems.find(data => data.productId === product?.productId);

    return !!foundItem;
  }

  const sizeArray = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (product) {
      const imageCount = product?.image?.length || 1;
      const intervalTime = 3500;

      function run() {
        setCurrentIndex(prev => (prev + 1) % imageCount);
      }

      const startTimer = () => {
        timeoutId = setTimeout(() => {
          run();
          startTimer();
        }, intervalTime);
      };

      startTimer();
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [product]);

  return (
    <View style={productDetailStyles.profile}>
      <View>
        {product?.image.length > 0 ? (
          <ImageBackground
            testID="carousel-image"
            source={{uri: product?.image[currentIndex]}}
            style={productDetailStyles.profileContainer}
            imageStyle={productDetailStyles.profileImage}>
            <View style={productDetailStyles.carouselCon}>
              {Array.from({length: product?.image.length}).map(
                (number, index) => (
                  <TouchableOpacity
                    onPress={() => setCurrentIndex(index)}
                    key={index}
                    style={{
                      ...productDetailStyles.carousel,
                      borderRadius: 60,
                      ...(currentIndex === index && {
                        backgroundColor: 'white',
                        width: wp('4%'),
                      }),
                    }}
                  />
                ),
              )}
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={productDetailStyles.gradient}
            />
          </ImageBackground>
        ) : (
          <Text>No images available</Text>
        )}
      </View>
      <View style={productDetailStyles.optionsCon}>
        <View style={productDetailStyles.options}>
          <View style={{width: '98%'}}>
            <TouchableOpacity
              style={productDetailStyles.iconCon}
              onPress={() => navigation.navigate(screenNames.chat)}
              testID="chat-icon-button">
              <Fontisto name="hipchat" color="white" size={wp('5%')} />
            </TouchableOpacity>
          </View>

          <Text style={productDetailStyles.nikeText} numberOfLines={2}>
            {product?.title?.slice(0, 20)}
          </Text>

          <View style={productDetailStyles.imgAndTextCon}>
            <View style={productDetailStyles.imgCon}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
                }}
                style={productDetailStyles.avatar}
              />
              <View>
                <Text style={productDetailStyles.sharedText}>
                  Ndubuisi Agbo
                </Text>
                <Text
                  style={{
                    ...productDetailStyles.sharedText,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  Pro seller
                </Text>
              </View>
            </View>

            <View>
              <Text style={productDetailStyles.amount}>
                ${Intl.NumberFormat().format(product?.price)}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                ...productDetailStyles.sharedText,
                fontSize: 16,
                marginTop: 5,
              }}>
              Size
            </Text>
            <View style={productDetailStyles.sizeCon}>
              {sizeArray.map(size => (
                <TouchableOpacity
                  key={size}
                  style={{
                    ...productDetailStyles.sizeCell,
                    ...(selectedSize === size && {
                      backgroundColor: '#E7E7E7',
                    }),
                  }}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={{
                      ...productDetailStyles.sharedText,
                      fontSize: themes.FONT_SIZES.MEDIUM,
                      ...(selectedSize === size && {
                        color: themes.COLORS.BUTTON_COLOR,
                      }),
                    }}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <CustomButton
            title="ADD TO CART"
            testID="add-to-cart-button"
            marginTop={20}
            width={wp('88')}
            onPress={() => handleAddToCart()}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
