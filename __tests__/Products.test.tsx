import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Products} from '../src/components';
import {useProductState} from '../src/hook/useProduct';
import {fetchAllProducts} from '../src/actions/productActions';
import {screenNames} from '../src/screen/screenNames';
import {mockNavigate} from '../__mocks__/@react-navigation/native';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

jest.mock('../src/hook/useUsers', () => ({
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

jest.mock('../src/hook/useProduct', () => ({
  useProductState: jest.fn(() => ({
    allProducts: [
      {
        brand: '1',
        title: 'car',
        price: '200',
        category: 'Product 1',
        image: [],
      },
    ],
    uniqueSubCategoriesArray: [],
    setProduct: jest.fn(),
  })),
}));

jest.mock('../src/hook/useGlobal', () => ({
  useGlobalState: jest.fn(() => ({
    searchTitle: 'Search',
  })),
}));

jest.mock('../src/actions/productActions', () => ({
  fetchAllProducts: jest.fn(),
}));

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ProductList correctly', () => {
    const {getByText, getByTestId} = render(<Products />);

    expect(getByText('Categories')).toBeTruthy();
    expect(getByText('Best Deals')).toBeTruthy();
    act(() => {
      expect(getByTestId('input')).toBeTruthy();
    });
  });

  it('handles when array is empty', () => {
    (useProductState as jest.Mock).mockReturnValue({
      ...useProductState(),
      allProducts: [],
      isProductLoading: false,
    });
    const {getByText, debug} = render(<Products />);
    expect(getByText('Empty')).toBeTruthy();
  });

  // it('navigates to the Search screen on search input focus', () => {
  //   const {getByTestId} = render(<Products />);
  //   act(() => fireEvent(getByTestId('input'), 'focus'));
  //   expect(mockNavigate).toHaveBeenCalledWith('Search');
  // });

  it('navigates to the Categories screen on tab button press', () => {
    const {getByText} = render(<Products />);

    fireEvent.press(getByText('Categories'));
    expect(mockNavigate).toHaveBeenCalledWith(screenNames.categories);
  });

  it('navigates to the Best Deals screen on tab button press', () => {
    const {getByText} = render(<Products />);

    fireEvent.press(getByText('Best Deals'));
    expect(mockNavigate).toHaveBeenCalledWith(screenNames.bestDeals);
  });

  it('calls fetchAllProducts on component mount', () => {
    render(<Products />);

    expect(fetchAllProducts).toHaveBeenCalled();
  });
  it('shows loading spinner when products are being fetched', () => {
    (useProductState as jest.Mock).mockReturnValue({
      allProducts: [],
      isProductLoading: true,
    });
    const {getByTestId, debug} = render(<Products />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });
});
