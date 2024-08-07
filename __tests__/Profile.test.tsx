import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {mockNavigate} from '../__mocks__/@react-navigation/native';
import {Profile} from '../components';
import {getAllOrders} from '../actions/orderActions';
import {screen} from '../constants/screens';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

jest.mock('../components/recoilState/productState', () => ({
  useProductState: jest.fn(() => ({
    allProducts: [
      {
        brand: '1',
        title: 'car',
        price: '200',
        category: 'Product 1',
        image: [image],
      },
    ],
    isProductLoading: false,
  })),
}));
jest.mock('../components/recoilState/globalState', () => ({
  useGlobalState: jest.fn(() => ({
    globalState: jest.fn(),
    recentlyViewed: [
      {
        brand: '1',
        title: 'car',
        price: '200',
        category: 'Product 1',
        image: [image],
      },
    ],
  })),
}));

jest.mock('../components/recoilState/userState', () => ({
  useUserState: () => ({
    currentUser: {
      userId: 'user123',
      userName: 'John Doe',
      category: 'Seller',
      profilePic: image,
      location: 'New York, NY',
      isUserLoading: false,
      role: 'Admin',
    },
    setUser: jest.fn(() => ({})),
  }),
}));

jest.mock('../components/recoilState/chatState', () => ({
  useAllChatState: () => ({
    allChat: {category: []},
  }),
  messageNotificationForCustomer: () => [{}, {}, {}],
}));

jest.mock('../components/recoilState/orderState', () => ({
  useOrderState: () => ({
    orders: {
      isOrderLoading: false,
    },
  }),
  userOrdersHistory: () => [{}, {}],
}));

jest.mock('../actions/orderActions', () => ({
  getAllOrders: jest.fn(),
}));

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Profile component correctly', () => {
    const {getByText} = render(<Profile />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Pro')).toBeTruthy();
    expect(getByText('Seller')).toBeTruthy();
    expect(getByText('New York, NY')).toBeTruthy();
    expect(getByText('Orders')).toBeTruthy();
    expect(getByText('Bids & Offers')).toBeTruthy();
    expect(getByText('Messages')).toBeTruthy();
    expect(getByText('Recently viewed')).toBeTruthy();
  });

  it('should navigate to the chat screen when Messages is pressed', async () => {
    const {getByText} = render(<Profile />);

    act(() => {
      fireEvent.press(getByText('Messages'));
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Chat');
  });
  it('should navigate to the home-stact screen when view all is pressed', async () => {
    const {getByText} = render(<Profile />);

    act(() => {
      fireEvent.press(getByText('View All'));
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(screen.homeStack);
  });

  it('should display the correct number of orders', () => {
    const {getByText} = render(<Profile />);

    expect(getByText('2')).toBeTruthy();
  });

  it('should display the correct number of unread messages in  messageNotificationForCustomer', () => {
    const {getByText} = render(<Profile />);
    expect(getByText('3')).toBeTruthy();
  });

  it('should display product images in Recently viewed section', () => {
    const {getByTestId} = render(<Profile />);
    expect(getByTestId(`index0`)).toHaveProp('source', {
      uri: image,
    });
  });

  it('should call getAllOrders on render', () => {
    render(<Profile />);
    expect(getAllOrders).toHaveBeenCalled();
  });
});
