import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/utils';
import {styles as cartStyle} from './cartStyle';
import {CartItem, useCartState} from '../../components/recoilState/cartState';
import Card from '../../components/Card/Card';
import globalStyle from '../../constants/globalStyle';
import {useSnackBarState} from '../../components/recoilState/snacbarState';
import {manageSavedProduct} from '../../actions/cartAction';

interface Props {
  modalStatus: boolean;
  setModalStatus: (value: boolean) => void;
}
const SavedForLater = ({modalStatus, setModalStatus}: Props) => {
  const {setSnackBar} = useSnackBarState();
  const {savedForLaterItems, setCart} = useCartState();

  function handleCloseModal() {
    setModalStatus(false);
  }

  function restoreItemToCart(product: CartItem) {
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
    manageSavedProduct(data, setCart, setSnackBar, 'add');
  }

  function deleteProduct(product: CartItem) {
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
    manageSavedProduct(data, setCart, setSnackBar, 'delete');
  }
  const itemCount = savedForLaterItems.length;
  const itemLabel = itemCount < 2 ? 'item' : 'items';

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        onRequestClose={handleCloseModal}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <TouchableOpacity
              testID="close-btn"
              style={{
                ...style.button,
                alignSelf: 'center',
                backgroundColor: globalStyle.COLORS.DARKGREEN,
              }}
              onPress={handleCloseModal}>
              <Text
                style={[
                  cartStyle.optionsText,
                  {color: 'white', fontWeight: '700'},
                ]}>
                CLOSE
              </Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={style.itemCon}
              showsVerticalScrollIndicator={false}>
              <Text style={style.label}>
                You have {itemCount} {itemLabel} saved for later
              </Text>
              {savedForLaterItems.map((item, index) => (
                <View key={index} style={{marginVertical: 20}}>
                  <Card minHeight={130} maxWidth={width - 30} paddingLeft={4}>
                    <View>
                      <View style={cartStyle.imgAndTextCon}>
                        <View>
                          <View style={[cartStyle.imageContainer]}>
                            <Image
                              source={{uri: item.image[0]}}
                              style={[cartStyle.image]}
                            />
                          </View>
                        </View>
                        <View>
                          <View style={cartStyle.productDescription}>
                            <Text
                              style={cartStyle.productTitle}
                              numberOfLines={2}>
                              {item.title}
                            </Text>

                            <View style={cartStyle.inStockCon}>
                              <Text
                                style={{
                                  color: 'red',
                                }}>
                                ${Intl.NumberFormat().format(item?.price)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={style.btnCon}>
                        <TouchableOpacity
                          testID={`delete-item${index}`}
                          style={style.button}
                          onPress={() => deleteProduct(item)}>
                          <Text
                            style={[
                              cartStyle.optionsText,
                              {color: 'white', fontWeight: '700'},
                            ]}>
                            {' '}
                            DELETE
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={`return-item${index}`}
                          style={{
                            ...style.button,
                            backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
                          }}
                          onPress={() => restoreItemToCart(item)}>
                          <Text
                            style={[
                              cartStyle.optionsText,
                              {color: 'white', fontWeight: '700'},
                            ]}>
                            {' '}
                            MOVE TO CART
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedForLater;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 30,
    width,
  },
  modalView: {
    marginTop: 50,
    width: width / 1.05,
  },
  itemCon: {
    borderRadius: 20,
    paddingTop: 15,
    elevation: 5,
    marginTop: 10,
    paddingBottom: 50,
    backgroundColor: 'white',
    height: height,
  },
  closeBtnCon: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 0,
    width,
    paddingVertical: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 19,
    marginBottom: 10,
    color: 'black',
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: 'red',
    padding: 7,
    alignItems: 'center',
    width: width / 3,
    borderRadius: 3,
  },
});
