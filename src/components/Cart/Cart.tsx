import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import * as cartAction from '../../actions/cartAction';
import {useNavigation} from '@react-navigation/native';
import {cartStyles} from './cartStyles.ts';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import Select from '../SelectButton/Select';
import {CustomButton, Card} from '../';
import {useUserState} from '../../hook/useUsers.ts';
import {useCartState, CartItem} from '../../hook/useCart.ts';
import {useSnackBarState} from '../../hook/useSnackbar.ts';
import {createOrder} from '../../actions/orderActions';
import {useOrderState} from '../../hook/useOrder.ts';
import {ProductInterface} from '../../hook/useProduct.ts';
import {PAYSTACK_TEST_PUBLIC_KEY} from '@env';
import {useProductState} from '../../hook/useProduct.ts';
import {wp} from '../../config/appConfig.ts';
import {NavigationProps, screenNames} from '../../screen';
import SavedForLater from './SavedForLater/SavedForLater.tsx';
import ShoppedByOthers from './ShoppedByOthers/ShoppedByOthers.tsx';
import {useAuthentication} from '../../actions/usersAction';

export type Data = {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
};

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
    const data: CartItem = {
      ...product,
      quantity,
      totalPrice: totalPrice,
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
      date: new Date().toString(),
      selectedSize: 'M',
    };
    cartAction.saveProductForLeter(data, setCart, setSnackBar);
  }
  async function handlePaymentSuccess(reference: Partial<{}>) {
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

  function handlePaystackCloseAction() {
    Alert.alert(
      'Transaction Failed',
      'Unfortunately, we were unable to complete your transaction at this time. Please try again later or contact support if the issue persists. We apologize for any inconvenience this may have caused.',
      [{text: 'OK', style: 'default'}],
    );
  }

  function handleRemoveItem(product: CartItem) {
    cartAction.removeCartItem(product, setCart, setSnackBar);
  }

  const numberOfItemsInCart = cartItems.length;

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
          width={wp('90%')}
          marginTop={15}
          testID={testID}
          onPress={() =>
            currentUser?.email
              ? paystackWebViewRef?.current?.startTransaction()
              : navigation.navigate(screenNames.signIn)
          }
        />
      </View>
    );
  }
  const renderEmptyCartMessage = () => (
    <View style={cartStyles.emptyCartCon}>
      {savedForLaterItems.length < 1 ? (
        <Text style={cartStyles.emptyCartText}>
          You have no item in your cart
        </Text>
      ) : (
        <View style={cartStyles.emptyCartCon}>
          <Text style={cartStyles.emptyCartText}>
            There are no items in your cart right now. However, you can check
            out the items you’ve saved for later below.
          </Text>
          <CustomButton
            title="VIEW"
            width={wp('50%')}
            marginTop={15}
            testID="saved-for-later-modal-opener"
            onPress={() => setIsSaveForLaterOpen(true)}
          />
        </View>
      )}
    </View>
  );

  const renderCartItems = () => (
    <View>
      <View style={cartStyles.subTotalCont}>
        <Text style={cartStyles.subTotalLabel}>
          Cart Subtotal ({cartItems.length}):
        </Text>
        <Text style={cartStyles.subTotalValue}>
          ${Intl.NumberFormat().format(subTotal)}
        </Text>
      </View>
      <CheckoutButton testID="top-checkout-button" />
      {savedForLaterItems.length > 0 && (
        <TouchableOpacity onPress={() => setIsSaveForLaterOpen(prev => !prev)}>
          <Text style={cartStyles.viewSavedItemtext}>view saved items</Text>
        </TouchableOpacity>
      )}
      <View style={cartStyles.itemCon}>
        {cartItems.map((item, index) => (
          <View key={index} style={cartStyles.item}>
            <Card minHeight={130} maxWidth={wp('94%')} paddingLeft={4}>
              <View>
                <View style={cartStyles.imgAndTextCon}>
                  <View style={cartStyles.imageContainer}>
                    <Image
                      source={{uri: item.image[0]}}
                      style={cartStyles.image}
                    />
                  </View>
                  <View>
                    <View style={cartStyles.productDescription}>
                      <Text style={cartStyles.productTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View style={cartStyles.inStockCon}>
                        <Text style={cartStyles.inStockText}>In stock</Text>
                        <Text style={cartStyles.price}>
                          ₦ {Intl.NumberFormat().format(item.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={cartStyles.groupedButCon}>
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
                  <TouchableOpacity
                    testID={`delete-item${index}`}
                    onPress={() => handleRemoveItem(item)}
                    style={{...cartStyles.optionsButton, width: wp('27%')}}>
                    <Text style={cartStyles.optionsText}>DELETE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID={`save-item${index}`}
                    onPress={() => handleSaveForLater(item)}
                    style={cartStyles.optionsButton}>
                    <Text style={cartStyles.optionsText}> SAVE FOR LATER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </View>
      <View>
        <ShoppedByOthers
          products={itemsShoppedByOthers}
          addToCart={handleAddToCart}
        />
        <CheckoutButton testID="bottom-checkout-button" />
      </View>
    </View>
  );

  return (
    <View style={cartStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isOrderLoading ? (
          <ActivityIndicator color="green" style={cartStyles.spinner} />
        ) : numberOfItemsInCart < 1 ? (
          renderEmptyCartMessage()
        ) : (
          renderCartItems()
        )}
        <SavedForLater
          modalStatus={isSaveForLaterOpen}
          setModalStatus={setIsSaveForLaterOpen}
        />
      </ScrollView>
    </View>
  );
};

export default Cart;
