import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {CartItem} from './cartState';
import {mergeSort} from '../../constants/utils';
export interface OrderItem {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
  orderId: string;
}

export interface OrderState {
  allOrders: Record<string, OrderItem[]>;
  isOrderLoading: boolean;
  isOrderError: boolean;
}
export const orderState = atom<OrderState>({
  key: 'orderKey',
  default: {
    allOrders: {},
    isOrderLoading: false,
    isOrderError: false,
  },
});

export const useOrderState = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const {allOrders, isOrderLoading, isOrderError} = orders;
  return {
    allOrders,
    isOrderLoading,
    isOrderError,
    setOrders,
  };
};
export const userOrdersHistory = (email: string) => {
  const {allOrders} = useOrderState();
  const data = allOrders[email] || [];
  const array = sortedDescending(data);
  return array;
};
function sortedDescending(data: OrderItem[]) {
  const sorted = mergeSort(data, (a: OrderItem, b: OrderItem) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return sorted;
}
