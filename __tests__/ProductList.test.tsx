import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {ProductList} from '../components';
import {useProductState} from '../components/recoilState/productState';
import {fetchAllProducts} from '../actions/productActions';
import {screen} from '../constants/screens';
import {mockNavigate} from '../__mocks__/@react-navigation/native';

jest.mock('../components/recoilState/productState', () => ({
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

jest.mock('../components/recoilState/globalState', () => ({
  useGlobalState: jest.fn(() => ({
    searchTitle: 'Search',
  })),
}));

jest.mock('../actions/productActions', () => ({
  fetchAllProducts: jest.fn(),
}));
jest.mock('galio-framework', () => ({
  Button: (props: any) => <button {...props} />,
  Input: (props: any) => <input {...props} />,
}));

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ProductList correctly', () => {
    const {getByText, getByTestId} = render(<ProductList />);

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
    const {getByText, debug} = render(<ProductList />);
    expect(getByText('Empty')).toBeTruthy();
  });

  it('navigates to the Search screen on search input focus', () => {
    const {getByTestId} = render(<ProductList />);
    act(() => fireEvent(getByTestId('input'), 'focus'));
    expect(mockNavigate).toHaveBeenCalledWith('Search');
  });

  it('navigates to the Categories screen on tab button press', () => {
    const {getByText} = render(<ProductList />);

    fireEvent.press(getByText('Categories'));
    expect(mockNavigate).toHaveBeenCalledWith(screen.categories);
  });

  it('navigates to the Best Deals screen on tab button press', () => {
    const {getByText} = render(<ProductList />);

    fireEvent.press(getByText('Best Deals'));
    expect(mockNavigate).toHaveBeenCalledWith(screen.bestDeals);
  });

  it('calls fetchAllProducts on component mount', () => {
    render(<ProductList />);

    expect(fetchAllProducts).toHaveBeenCalled();
  });
  it('shows loading spinner when products are being fetched', () => {
    (useProductState as jest.Mock).mockReturnValue({
      allProducts: [],
      isProductLoading: true,
    });
    const {getByTestId, debug} = render(<ProductList />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });
});
