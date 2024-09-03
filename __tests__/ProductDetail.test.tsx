import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {ProductDetail} from '../src/components';
import {useCartState} from '../src/hook/useCart';
import {addProductToCart} from '../src/actions/cartAction';
import {mockNavigate, useRoute} from '../__mocks__/@react-navigation/native';
import {Alert} from 'react-native';
import {screenNames} from '../src/screen';
import themes from '../src/config/themes';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

const mockSetCart = jest.fn();
const mockSetSnackBar = jest.fn();

jest.mock('../src/hook/useCart', () => ({
  useCartState: jest.fn(() => ({
    cartItems: [],
    setCart: mockSetCart,
    savedForLaterItems: [],
  })),
}));

jest.mock('../src/hook/useSnackbar', () => ({
  useSnackBarState: jest.fn(() => ({
    setSnackBar: mockSetSnackBar,
  })),
}));

jest.mock('../src/actions/cartAction', () => ({
  addProductToCart: jest.fn(),
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRoute as jest.Mock).mockReturnValue({
      params: {
        productId: '123',
        title: 'Sample Product',
        price: 100,
        image: [image],
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with product data', () => {
    const {getByText, getByTestId} = render(<ProductDetail />);
    expect(getByText('Sample Product')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
    expect(getByText('Ndubuisi Agbo')).toBeTruthy();
    expect(getByTestId('add-to-cart-button')).toBeTruthy();
  });

  it('handles size selection correctly', () => {
    const {getByText} = render(<ProductDetail />);
    expect(getByText('M').props.style.color).toBe(themes.COLORS.BLACK);
    // expect(getByText('M').props.style.color).toBe('#000000');
    act(() => {
      fireEvent.press(getByText('M'));
    });
    expect(getByText('M').props.style.color).toBe('#1FAB13');
  });

  it('adds product to cart when Add to Cart button is pressed', async () => {
    const {getByTestId} = render(<ProductDetail />);
    act(() => {
      fireEvent.press(getByTestId('add-to-cart-button'));
    });
    await waitFor(() => {
      expect(addProductToCart).toHaveBeenCalledTimes(1);
    });
  });

  it('prevents adding duplicate products to cart', async () => {
    (useCartState as jest.Mock).mockReturnValue({
      cartItems: [{productId: '123'}],
      setCart: mockSetCart,
    });
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation();

    const {getByTestId} = render(<ProductDetail />);
    act(() => {
      fireEvent.press(getByTestId('add-to-cart-button'));
    });

    await waitFor(() => {
      expect(addProductToCart).not.toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('Item already in cart');
    });
  });

  it('updates carousel image correctly on timer', async () => {
    const {getByTestId} = render(<ProductDetail />);

    jest.advanceTimersByTime(3500);

    await waitFor(() => {
      expect(getByTestId('carousel-image')).toHaveProp('source', {
        uri: image,
      });
    });
  });

  it('navigates to chat screen on icon press', () => {
    const {getByTestId} = render(<ProductDetail />);
    act(() => {
      fireEvent.press(getByTestId('chat-icon-button'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(screenNames.chat);
  });

  it('handles product with no images correctly', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        productId: '123',
        title: 'Sample Product',
        price: 100,
        image: [],
      },
    });
    const {queryByTestId} = render(<ProductDetail />);
    expect(queryByTestId('carousel-image')).toBeNull();
  });

  it('shows snackbar when adding product to cart', async () => {
    (useCartState as jest.Mock).mockReturnValue({
      ...useCartState(),
      cartItems: [],
      savedForLaterItems: [],
    });
    const {getByTestId} = render(<ProductDetail />);
    act(() => {
      fireEvent.press(getByTestId('add-to-cart-button'));
    });
    await waitFor(() => {
      expect(addProductToCart).toHaveBeenCalledTimes(1);
    });
  });
});
