import {CartState, CartItem} from '../components/recoilState/cartState';
import {
  snackBarFailure,
  snackBarSuccess,
} from '../components/recoilState/snacbarState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addProductToCart = async (
  newProduct: any,
  setCart: any,
  setSnackBar: any,
) => {
  const {productId} = newProduct;

  try {
    setCart((prev: CartState) => {
      const newState = {...prev};
      newState.itemsInCart = {...newState.itemsInCart};
      newState.itemsInCart[productId] = {...newProduct};
      newState.subTotal += newState.itemsInCart[productId].totalPrice;
      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess('Product added successfully', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('Failed to add product to cart', 'error', setSnackBar);
  }
};

export const incrementQuantityInDatabase = async (
  product: CartItem,
  quantity: number,
  setCart: any,
  setSnackBar: any,
) => {
  const {productId} = product;
  try {
    setCart((prev: CartState) => {
      const newState = {...prev};
      newState.itemsInCart = {
        ...newState.itemsInCart,
        [productId]: {
          ...newState.itemsInCart[productId],
          totalPrice: newState.itemsInCart[productId].price * quantity,
          quantity: quantity,
        },
      };

      newState.subTotal = Object.values(newState.itemsInCart).reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess('Quantity updated successfully', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('Failed to update quantity to cart', 'error', setSnackBar);
  }
};

export const removeCartItem = async (
  product: CartItem,
  setCart: any,
  setSnackBar: any,
) => {
  try {
    const {productId} = product;

    setCart((prev: CartState) => {
      const newState = {...prev};
      newState.itemsInCart = {...newState.itemsInCart};
      newState.subTotal -= newState.itemsInCart[productId].totalPrice;
      delete newState.itemsInCart[productId];

      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess('Product was removed from cart', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('failed to removeProduct from cart', 'error', setSnackBar);
  }
};

export const saveProductForLeter = async (
  product: any,
  setCart: any,
  setSnackBar: any,
) => {
  try {
    removeCartItem(product, setCart, '');
    setCart((prev: CartState) => {
      const newState = {...prev};
      newState.savedForLaterItems = [...newState.savedForLaterItems, product];

      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess('Product saved successfully', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('Failed to add product to cart', 'error', setSnackBar);
  }
};

export const manageSavedProduct = async (
  product: any,
  setCart: (value: any) => void,
  setSnackBar: (value: any) => void,
  type: string,
) => {
  const isDelete = type === 'delete';
  try {
    const {productId} = product;

    setCart((prev: CartState) => {
      const newState = {...prev};
      newState.savedForLaterItems = newState.savedForLaterItems.filter(
        item => item.productId !== productId,
      );

      isDelete && updateStateInStorage(newState);
      return newState;
    });
    !isDelete && addProductToCart(product, setCart, '');
  } catch (error) {
    snackBarFailure('failed to remove product', 'error', setSnackBar);
    throw Error();
  }
};

export async function clearCartInDatabase(setCart: any, setSnackBar: any) {
  try {
    setCart((prev: CartState) => ({
      ...prev,
      itemsInCart: {},
      subTotal: 0,
    }));
    clearCartFromStorage();
    snackBarSuccess('Cart cleared successfully', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('Oops: failed to clear cart', 'error', setSnackBar);
  }
}

async function updateStateInStorage(newState: CartState) {
  try {
    const newStateJSON = JSON.stringify(newState);
    AsyncStorage.setItem('cartKey', newStateJSON);
  } catch (error) {
    throw new Error('failed to update in storage');
  }
}
async function clearCartFromStorage() {
  try {
    await AsyncStorage.removeItem('cartKey');
  } catch (error) {}
}
