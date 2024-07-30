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
  usersCarts: Record<string, CartItem>;
  itemsInCart: Record<string, CartItem>;
  subTotal: number;
}

export const cartState = atom<CartState>({
  key: 'cartKey',
  default: {
    usersCarts: {},
    itemsInCart: {},
    subTotal: 0,
  },
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const {itemsInCart, subTotal} = cart;
  const cartItems = Object.values(itemsInCart);
  useEffect(() => {
    const loadCartStateFromStorage = async () => {
      try {
        const storedCartState = await AsyncStorage.getItem('cartKey');

        if (storedCartState !== null) {
          const parsedCartState = JSON.parse(storedCartState);
          setCart(parsedCartState);
        }
      } catch (error) {
        console.error('Error loading cart state from AsyncStorage:', error);
      }
    };

    loadCartStateFromStorage();
  }, []);
  return {cartItems, subTotal, setCart};
};
