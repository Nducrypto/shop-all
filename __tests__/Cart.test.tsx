import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {Cart} from '../components';
import {useCartState} from '../components/recoilState/cartState';
import {useUserState} from '../components/recoilState/userState';
import {mockNavigate} from '../__mocks__/@react-navigation/native';
import {removeCartItem} from '../actions/cartAction';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

const userId = '123456';
jest.mock('../components/recoilState/userState', () => ({
  useUserState: jest.fn(() => ({
    previousRoute: 'Product-List',
    isUserLoading: false,

    setUser: jest.fn(() => ({})),
  })),
}));
jest.mock('../components/recoilState/cartState', () => ({
  useCartState: jest.fn(() => ({
    cartItems: [
      {title: 'Sample Product', image: [image], price: 5000},
      {title: 'Sample', image: [image]},
    ],
    savedForLaterItems: [
      {title: 'Sample Product', image: [image], price: 5000},
      {title: 'Sample', image: [image]},
    ],
    subTotal: 500,
  })),
}));
jest.mock('../components/recoilState/productState', () => ({
  useProductState: jest.fn(() => ({
    allProducts: [{title: 'Sample Product', image: [image]}],
  })),
}));
jest.mock('../components/recoilState/snacbarState', () => ({
  useSnackBarState: jest.fn(() => ({
    setSnackBar: jest.fn(),
  })),
}));
jest.mock('../components/recoilState/orderState', () => ({
  useOrderState: jest.fn(() => ({
    allOrders: [],
  })),
}));
jest.mock('../actions/cartAction', () => ({
  removeCartItem: jest.fn(),
}));

jest.mock('galio-framework', () => ({
  Button: (props: any) => <button {...props} />,
}));

describe('Cart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display cart items and total price when there are items in the cart', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('Sample Product')).toBeTruthy();
    expect(getByText('$5,000')).toBeTruthy();
    expect(
      getByText(
        'Customers who shopped for items in your cart also shopped for:',
      ),
    ).toBeTruthy();
  });

  it('should display a "Sign In" button when there is no logged-in user', async () => {
    (useUserState as jest.Mock).mockReturnValue({
      currentUser: null,
    });
    const {queryAllByText, getByTestId} = render(<Cart />);
    expect(queryAllByText('SIGN IN TO CONTINUE')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('top-checkout-button'));
    });
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('SignIn');
  });

  it('should display a "Proceed to Checkout" button when there is a logged-in user', async () => {
    (useUserState as jest.Mock).mockReturnValue({
      currentUser: {
        userId,
      },
    });
    const {queryAllByText, getByTestId} = render(<Cart />);
    expect(queryAllByText('PROCEED TO CHECKOUT')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('top-checkout-button'));
    });
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should call removeCartItem action when the delete button is pressed', async () => {
    (useUserState as jest.Mock).mockReturnValue({
      currentUser: {
        userId,
      },
    });
    const {getByTestId} = render(<Cart />);
    expect(getByTestId('delete-item0')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('delete-item0'));
    });
    await waitFor(() => {
      expect(removeCartItem).toHaveBeenCalled();
    });
  });

  it('should render an empty cart message when there are no items in the cart', () => {
    (useCartState as jest.Mock).mockReturnValue({
      ...useCartState(),
      cartItems: [],
      savedForLaterItems: [],
    });

    const {getByText} = render(<Cart />);
    expect(getByText('Empty')).toBeTruthy();
  });

  it('should render a message when there are no items in the cart for there are items saved for later', () => {
    (useCartState as jest.Mock).mockReturnValue({
      ...useCartState(),
      cartItems: [],
      savedForLaterItems: [
        {title: 'Sample Product', image: [image], price: 5000},
      ],
    });

    const {getByText} = render(<Cart />);
    expect(
      getByText(
        'There are no items in your cart right now. However, you can check out the items you’ve saved for later below.',
      ),
    ).toBeTruthy();
  });
});
