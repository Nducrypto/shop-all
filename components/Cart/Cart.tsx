import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as cartAction from '../../actions/cartAction';
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
import {width} from '../../constants/utils';
import {NavigationProps, screen} from '../../constants/screens';
import SavedForLater from './SavedForLater';
import ShoppedByOthers from './ShoppedByOthers';
import {useAuthentication} from '../../actions/usersAction';

export interface Data {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
}

const Cart = () => {
  useAuthentication();
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [isSaveForLaterOpen, setIsSaveForLaterOpen] = useState<boolean>(false);
  const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef | any>();
  const navigation = useNavigation<NavigationProps>();
  const {currentUser} = useUserState();
  const {cartItems, savedForLaterItems, subTotal, setCart} = useCartState();
  const {allProducts} = useProductState();
  const {setSnackBar} = useSnackBarState();
  const {setOrders, isOrderLoading} = useOrderState();

  const handleOnSelect = async (
    index: string,
    value: number,
    item: CartItem,
  ) => {
    const {productId} = item;
    setQuantity(prev => ({...prev, [productId]: value}));
    cartAction.incrementQuantityInDatabase(
      item,
      Number(value),
      setCart,
      setSnackBar,
    );
  };

  const itemsShoppedByOthers = cartItems.length
    ? allProducts.filter(
        product =>
          !cartItems.some(
            cartItem => cartItem.productId === product.productId,
          ) &&
          !savedForLaterItems.some(
            savedItem => savedItem.productId === product.productId,
          ),
      )
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
    cartAction.addProductToCart(data, setCart, setSnackBar);
  }
  function handleSaveForLater(product: CartItem) {
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
    cartAction.saveProductForLeter(data, setCart, setSnackBar);
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
    cartAction.removeCartItem(product, setCart, setSnackBar);
  }

  const numberOfItemsInCart = cartItems.length;

  if (!numberOfItemsInCart && !savedForLaterItems.length) {
    return (
      <View style={styles.emptyCartCon}>
        <Text style={{...styles.emptyCartText, fontSize: 24}}>
          You have no item in your cart
        </Text>
      </View>
    );
  }

  function CheckoutButton({testID}: {testID: string}) {
    return (
      <View style={{alignItems: 'center'}}>
        <Paystack
          paystackKey={paystackKey}
          billingEmail={currentUser?.email ?? ''}
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
          width={width / 1.13}
          marginTop={15}
          testID={testID}
          onPress={() =>
            currentUser?.email
              ? paystackWebViewRef?.current?.startTransaction()
              : navigation.navigate(screen.signIn)
          }
        />
      </View>
    );
  }
  const renderEmptyCartMessage = () => (
    <View style={styles.emptyCartCon}>
      <Text style={styles.emptyCartText}>
        There are no items in your cart right now. However, you can check out
        the items you’ve saved for later below.
      </Text>
      <CustomButton
        title="VIEW"
        width={width / 2}
        marginTop={15}
        testID="saved-for-later-modal-opener"
        onPress={() => setIsSaveForLaterOpen(true)}
      />
    </View>
  );

  const renderCartItems = () => (
    <View>
      <View style={styles.subTotalCont}>
        <Text style={styles.subTotalLabel}>
          Cart Subtotal ({cartItems.length}):
        </Text>
        <Text style={styles.subTotalValue}>
          ${Intl.NumberFormat().format(subTotal)}
        </Text>
      </View>
      <CheckoutButton testID="top-checkout-button" />
      {savedForLaterItems.length > 0 && (
        <TouchableOpacity onPress={() => setIsSaveForLaterOpen(prev => !prev)}>
          <Text style={styles.viewSavedItemtext}>view saved items</Text>
        </TouchableOpacity>
      )}
      <View style={styles.itemCon}>
        {cartItems.map((item, index) => (
          <View key={index} style={{marginVertical: 20}}>
            <Card minHeight={130} maxWidth={width - 25} paddingLeft={4}>
              <View>
                <View style={styles.imgAndTextCon}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri: item.image[0]}} style={styles.image} />
                  </View>
                  <View>
                    <View style={styles.productDescription}>
                      <Text style={styles.productTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View style={styles.inStockCon}>
                        <Text style={{color: 'green'}}>In stock</Text>
                        <Text
                          style={{color: globalStyle.COLORS.GRADIENT_START}}>
                          ${Intl.NumberFormat().format(item.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.groupedButCon}>
                  <Select
                    defaultIndex={0}
                    options={['1', '2', '3', '4', '5']}
                    id={item.productId}
                    onSelect={(index, value) =>
                      handleOnSelect(item.productId, value, item)
                    }
                    value={quantity}
                    testID={`select${index}`}
                  />
                  <Button
                    center
                    shadowless
                    color={globalStyle.COLORS.DEFAULT}
                    textStyle={styles.optionsText}
                    style={styles.optionsButton}
                    testID={`delete-item${index}`}
                    onPress={() => handleRemoveItem(item)}>
                    DELETE
                  </Button>
                  <Button
                    center
                    shadowless
                    color={globalStyle.COLORS.DEFAULT}
                    textStyle={styles.optionsText}
                    style={styles.optionsButton}
                    onPress={() => handleSaveForLater(item)}>
                    SAVE FOR LATER
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </View>
      <ScrollView>
        <ShoppedByOthers
          products={itemsShoppedByOthers}
          addToCart={handleAddToCart}
        />
      </ScrollView>
      <View style={{marginTop: -25}}>
        <CheckoutButton testID="bottom-checkout-button" />
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        paddingLeft: 13,
        paddingVertical: 20,
      }}>
      {isOrderLoading ? (
        <ActivityIndicator color="green" style={{marginTop: 100}} />
      ) : cartItems.length < 1 && savedForLaterItems.length > 0 ? (
        renderEmptyCartMessage()
      ) : (
        renderCartItems()
      )}
      <SavedForLater
        modalStatus={isSaveForLaterOpen}
        setModalStatus={setIsSaveForLaterOpen}
      />
    </ScrollView>
  );
};

export default Cart;
