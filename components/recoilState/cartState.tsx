import {atom, useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string[];
  discountedPrice: number | null;
  productDetail: string;
  likes: string[];
  date: string;
  brand: string;
  title: string;
  category: string;
}

export interface CartState {
  itemsInCart: Record<string, CartItem>;
  subTotal: number;
  savedForLaterItems: CartItem[];
}

export const cartState = atom<CartState>({
  key: 'cartKey',
  default: {
    itemsInCart: {},
    subTotal: 0,
    savedForLaterItems: [],
  },
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const {itemsInCart, subTotal, savedForLaterItems} = cart;
  const cartItems = Object.values(itemsInCart);
  useEffect(() => {
    const loadCartStateFromStorage = async () => {
      try {
        const storedCartState = await AsyncStorage.getItem('cartKey');

        if (storedCartState !== null) {
          const parsedCartState = JSON.parse(storedCartState);
          setCart(parsedCartState);
        }
      } catch (error) {}
    };

    loadCartStateFromStorage();
  }, []);
  return {cartItems, subTotal, setCart, savedForLaterItems};
};
