import {Data} from '../components/Cart/Cart';
import {firestore, collection, onSnapshot} from '../config/firebase';
import {
  useOrderState,
  OrderItem,
  OrderState,
  SetOrderFunction,
} from '../hook/useOrder';
import {
  snackBarFailure,
  snackBarSuccess,
 SetSnackBarUpdate
} from '../hook/useSnackbar';
import {clearCartInDatabase} from './cartAction';
import {createInDatabase} from '../utils/firebaseUtils';
import {ORDERS} from '@env';

import {useEffect} from 'react';
import {screenNames} from '../screen/screenNames';
import {SetCartFunction} from '../hook/useCart';
import {NavigationProps} from '../screen';

const orderRoute = ORDERS;

export const createOrder = async (
  orderData: Data,
  setOrders: SetOrderFunction,
  setSnackBar: SetSnackBarUpdate,
  setCart: SetCartFunction,
  navigate: NavigationProps['navigate'],
) => {
  try {
    setOrders((prev: OrderState) => ({...prev, isOrderLoading: true}));
    const orderId = await createInDatabase(orderRoute, orderData);

    if (orderId) {
      setOrders((prev: OrderState) => {
        const newState = {...prev};

        newState.isOrderLoading = false;
        return newState;
      });
      clearCartInDatabase(setCart, setSnackBar);
      snackBarSuccess('Order placed successfully', 'success', setSnackBar);
      navigate(screenNames.productList);
    }
  } catch (error) {
    snackBarFailure('Failed to place order', 'error', setSnackBar);
  }
};
export const getAllOrders = () => {
  const {setOrders} = useOrderState();

  useEffect(() => {
    setOrders(prev => ({
      ...prev,
      isOrderLoading: true,
      isOrderError: false,
    }));

    const listenForChangeUsers = onSnapshot(
      collection(firestore, orderRoute),
      snapshot => {
        const allOrders: Record<string, OrderItem[]> = {};

        snapshot.forEach(doc => {
          const data = {
            ...(doc.data() as OrderItem),
            orderId: doc.id,
          };
          if (!allOrders[data.email]) {
            allOrders[data.email] = [];
          }
          allOrders[data.email].push(data);
        });
        setOrders(previous => ({
          ...previous,
          allOrders,
          isOrderLoading: false,
        }));
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, [setOrders]);
};
