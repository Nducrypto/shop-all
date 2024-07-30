import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  addProductToCart,
  clearCartInDatabase,
  incrementQuantityInDatabase,
  removeCartItem,
} from '../../actions/cartAction';
import {useNavigation} from '@react-navigation/native';
import {styles} from './cartStyle';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {Button} from 'galio-framework';
import globalStyle from '../../constants/globalStyle';
import Card from '../Card/Card';
import Select from '../SelectButton/Select';
import CustomButton from '../CustomButton/CustomButton';
import {useUserState} from '../recoilState/userState';
import {useCartState, CartItem} from '../recoilState/cartState';
import {useSnackBarState} from '../recoilState/snacbarState';
import {createOrder} from '../../actions/orderActions';
import {useOrderState} from '../recoilState/orderState';
import {ProductInterface} from '../recoilState/productState';

import {PAYSTACK_TEST_PUBLIC_KEY} from '@env';
import {useProductState} from '../recoilState/productState';
import DataLoader from '../DataLoader/DataLoader';
import {width} from '../../constants/utils';
import {screen} from '../../constants/screens';

export interface Data {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
}

const Cart = () => {
  const [quantity, setQuantity] = useState<string | number>(1);
  const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef | any>();
  const navigation = useNavigation<any>();
  const {currentUser} = useUserState();
  const {cartItems, subTotal, setCart} = useCartState();
  const {allProducts} = useProductState();
  const {setSnackBar} = useSnackBarState();
  const {setOrders, isOrderLoading} = useOrderState();

  const handleOnSelect = async (
    index: string,
    value: number | string,
    item: any,
  ) => {
    await setQuantity(value);
    incrementQuantityInDatabase(item, Number(value), setCart, setSnackBar);
  };

  const itemsShoppedByOthers = cartItems.length
    ? allProducts
        .filter(
          product =>
            !cartItems.some(
              cartItem => cartItem.productId === product.productId,
            ),
        )
        .slice(0, 8)
    : [];

  function handleAddToCart(product: ProductInterface) {
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const data = {
      ...product,
      quantity,
      totalPrice: totalPrice,
      discountedPrice: null,
      likes: null,
      date: new Date().toString(),
      selectedSize: 'M',
    };
    addProductToCart(data, setCart, setSnackBar);
  }
  async function handlePaymentSuccess(reference: any) {
    const data: Data = {
      email: currentUser?.email || '',
      userId: currentUser?.userId || '',
      items: cartItems,
      subTotal,
      status: 'Pending',
      date: new Date().toString(),
    };
    createOrder(data, setOrders, setSnackBar, setCart, navigation.navigate);
  }

  function handlePaystackCloseAction() {}

  function handleRemoveItem(product: CartItem) {
    removeCartItem(product, setCart, setSnackBar);
  }

  const numberOfItemsInCart = cartItems.length;

  function CheckoutButton({id}: {id: string}) {
    return (
      <View>
        <Paystack
          paystackKey={paystackKey}
          billingEmail={currentUser?.email || ''}
          amount={subTotal}
          currency="NGN"
          onCancel={handlePaystackCloseAction}
          onSuccess={res => handlePaymentSuccess(res)}
          ref={paystackWebViewRef}
          activityIndicatorColor="green"
        />
        <CustomButton
          title={
            currentUser?.email ? 'PROCEED TO CHECKOUT' : 'SIGN IN TO CONTINUE'
          }
          width="100%"
          marginTop={15}
          testID={id}
          onPress={() =>
            currentUser?.email
              ? paystackWebViewRef?.current?.startTransaction()
              : navigation.navigate(screen.signIn)
          }
        />
      </View>
    );
  }

  return (
    <DataLoader
      size="large"
      style={{marginTop: 60}}
      isLoading={false}
      array={cartItems}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subTotalCont}>
            <Text style={styles.subTotalLabel}>
              Cart Subtotal ({numberOfItemsInCart}):{' '}
            </Text>
            <Text style={styles.subTotalValue}>
              ${Intl.NumberFormat().format(subTotal)}
            </Text>
          </View>
          <CheckoutButton id="top-checkout-button" />
          <View style={styles.itemCon}>
            {cartItems.map((item, index) => (
              <View key={index} style={{marginVertical: 20}}>
                <Card minHeight={130} maxWidth={width - 30} paddingLeft={4}>
                  <View>
                    <View style={styles.imgAndTextCon}>
                      <View>
                        <View style={[styles.imageContainer, styles.shadow]}>
                          <Image
                            source={{uri: item.image[0]}}
                            style={[styles.image]}
                          />
                        </View>
                      </View>
                      <View>
                        <View style={styles.productDescription}>
                          <Text style={styles.productTitle} numberOfLines={2}>
                            {item.title}
                          </Text>

                          <View style={styles.inStockCon}>
                            <Text style={{color: 'green'}}>In stock</Text>
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
                    <View style={styles.groupedButCon}>
                      <View style={{marginTop: 8}}>
                        <Select
                          defaultIndex={0}
                          options={['1', '2', '3', '4']}
                          style={{}}
                          onSelect={(index, value) =>
                            handleOnSelect(index, value, item)
                          }
                          value={quantity}
                          testID={`select${index}`}
                        />
                      </View>
                      <View>
                        <Button
                          center
                          shadowless
                          color={globalStyle.COLORS.DEFAULT}
                          textStyle={styles.optionsText}
                          style={[styles.optionsButton]}
                          testID={`delete-item${index}`}
                          onPress={() => handleRemoveItem(item)}>
                          DELETE
                        </Button>
                      </View>
                      <View>
                        <Button
                          center
                          shadowless
                          color={globalStyle.COLORS.DEFAULT}
                          textStyle={styles.optionsText}
                          style={[styles.optionsButton]}>
                          SAVE FOR LATER
                        </Button>
                      </View>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
          </View>

          <View style={{marginBottom: 50}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Customers who shopped for items in your cart also shopped for:
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                minWidth: width,
              }}>
              {itemsShoppedByOthers.map((item, index) => (
                <View key={index} style={{marginTop: 30}}>
                  <Card minHeight={194} maxWidth={width / 2.6} paddingLeft={4}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('ProductDetail', {
                          ...item,
                        })
                      }>
                      <View>
                        <View style={[styles.imageContainer, styles.shadow]}>
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
                      onPress={() => handleAddToCart(item)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{marginTop: -25}}>
          <CheckoutButton id="bottom-checkout-button" />
        </View>
      </View>
    </DataLoader>
  );
};

export default Cart;
