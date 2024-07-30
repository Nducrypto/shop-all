import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import globalStyle from '../../constants/globalStyle';
import {HeaderHeight, width, height} from '../../constants/utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomButton} from '../index';
import {addProductToCart} from '../../actions/cartAction';
import {useCartState} from '../recoilState/cartState';
import {ProductInterface} from '../recoilState/productState';
import {useSnackBarState} from '../recoilState/snacbarState';
import LinearGradient from 'react-native-linear-gradient';
import {screen} from '../../constants/screens';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState<string>('2XL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigation = useNavigation<any>();
  const {params} = useRoute();
  const product = params as ProductInterface;

  const {cartItems, setCart} = useCartState();
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
      discountedPrice: null,
      likes: null,
      date: new Date().toString(),
      selectedSize,
    };
    addProductToCart(data, setCart, setSnackBar);
  }

  function isItemInCart() {
    const foundItem = cartItems.find(
      data => data.productId === product?.productId,
    );

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
    <View style={styles.profile}>
      <View>
        {product?.image.length > 0 ? (
          <ImageBackground
            testID="carousel-image"
            source={{uri: product?.image[currentIndex]}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <View style={styles.carouselCon}>
              {Array.from({length: product?.image.length}).map(
                (number, index) => (
                  <TouchableOpacity
                    onPress={() => setCurrentIndex(index)}
                    key={index}
                    style={{
                      ...styles.carousel,
                      borderRadius: 60,
                      ...(currentIndex === index && {
                        backgroundColor: 'white',
                        width: 25,
                      }),
                    }}
                  />
                ),
              )}
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={styles.gradient}
            />
          </ImageBackground>
        ) : (
          <Text>No images available</Text>
        )}
      </View>
      <View style={styles.options}>
        <View style={{width: '98%'}}>
          <TouchableOpacity
            style={styles.iconCon}
            onPress={() => navigation.navigate(screen.chat)}
            testID="chat-icon-button">
            <Fontisto name="hipchat" color="white" size={15} />
          </TouchableOpacity>
        </View>

        <Text style={styles.nikeText}>{product?.title?.slice(0, 20)}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgAndTextCon}>
            <View style={styles.imgCon}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
                }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.sharedText}>Ndubuisi Agbo</Text>
                <Text
                  style={{
                    ...styles.sharedText,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  Pro seller
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.amount}>
                ${Intl.NumberFormat().format(product?.price)}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{...styles.sharedText, fontSize: 16, marginTop: 5}}>
              Size
            </Text>
            <View style={styles.sizeCon}>
              {sizeArray.map(size => (
                <TouchableOpacity
                  key={size}
                  style={{
                    ...styles.sizeCell,
                    ...(selectedSize === size && {
                      backgroundColor: '#E7E7E7',
                    }),
                  }}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={{
                      ...styles.sharedText,
                      ...(selectedSize === size && {
                        color: globalStyle.COLORS.BUTTON_COLOR,
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
            width="100%"
            onPress={() => handleAddToCart()}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    marginTop: HeaderHeight && Platform.OS === 'android' ? -HeaderHeight : 0,
  },

  profileImage: {
    width: width,
    height: height / 2,
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },

  carouselCon: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    textAlign: 'center',
    top: 240,
    flexDirection: 'row',
    gap: 10,
  },
  carousel: {
    paddingBottom: 8,
    color: 'red',
    backgroundColor: 'red',
    height: 10,
    width: 10,
  },
  options: {
    position: 'relative',
    padding: 15,
    marginHorizontal: 12,
    top: -30,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    height: height / 1.8,
  },
  iconCon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -35,
    backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  nikeText: {
    marginBottom: 8,
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
    width: width / 2,
  },
  imgAndTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imgCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    top: -13,
  },
  sharedText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  seller: {
    marginRight: 10,
    color: 'white',
    fontSize: 16,
  },

  sizeCon: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 20,
  },
  sizeCell: {
    width: '33.3%',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    borderRightWidth: 1,
    borderRightColor: 'lightgrey',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});

export default ProductDetail;
