import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {wp} from '../../../config/appConfig';
import {cartStyles} from '../cartStyles';
import {CartItem, useCartState} from '../../../hook/useCart';
import Card from '../../Card/Card';
import {useSnackBarState} from '../../../hook/useSnackbar';
import {manageSavedProduct} from '../../../actions/cartAction';
import {savedForLaterStyles} from './savedForLaterStyles';
import themes from '../../../config/themes';

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
      date: new Date().toString(),
      selectedSize: 'M',
    };
    manageSavedProduct(data, setCart, setSnackBar, 'delete');
  }
  const itemCount = savedForLaterItems.length;
  const itemLabel = itemCount < 2 ? 'item' : 'items';

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        onRequestClose={handleCloseModal}>
        <View style={savedForLaterStyles.centeredView}>
          <View style={savedForLaterStyles.modalView}>
            <TouchableOpacity
              testID="close-btn"
              style={{
                ...savedForLaterStyles.button,
                alignSelf: 'center',
                backgroundColor: themes.COLORS.DARKGREEN,
              }}
              onPress={handleCloseModal}>
              <Text
                style={[
                  cartStyles.optionsText,
                  {color: themes.COLORS.WHITE, fontWeight: '700'},
                ]}>
                CLOSE
              </Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={savedForLaterStyles.itemCon}
              showsVerticalScrollIndicator={false}>
              <Text style={savedForLaterStyles.label}>
                You have {itemCount} {itemLabel} saved for later
              </Text>
              {savedForLaterItems.map((item, index) => (
                <View key={index} style={savedForLaterStyles.item}>
                  <Card minHeight={130} maxWidth={wp('92%')} paddingLeft={4}>
                    <View>
                      <View style={cartStyles.imgAndTextCon}>
                        <View>
                          <View style={[cartStyles.imageContainer]}>
                            <Image
                              source={{uri: item.image[0]}}
                              style={[cartStyles.image]}
                            />
                          </View>
                        </View>
                        <View>
                          <View style={cartStyles.productDescription}>
                            <Text
                              style={cartStyles.productTitle}
                              numberOfLines={2}>
                              {item.title}
                            </Text>

                            <View style={cartStyles.inStockCon}>
                              <Text
                                style={{
                                  color: 'red',
                                }}>
                                ₦ {Intl.NumberFormat().format(item?.price)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={savedForLaterStyles.btnCon}>
                        <TouchableOpacity
                          testID={`delete-item${index}`}
                          style={savedForLaterStyles.button}
                          onPress={() => deleteProduct(item)}>
                          <Text
                            style={[
                              cartStyles.optionsText,
                              {color: 'white', fontWeight: '700'},
                            ]}>
                            {' '}
                            DELETE
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={`return-item${index}`}
                          style={{
                            ...savedForLaterStyles.button,
                            backgroundColor: themes.COLORS.BUTTON_COLOR,
                          }}
                          onPress={() => restoreItemToCart(item)}>
                          <Text
                            style={[
                              cartStyles.optionsText,
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
