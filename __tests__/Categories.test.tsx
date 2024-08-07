import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Categories} from '../components';
import {useProductState} from '../components/recoilState/productState';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

jest.mock('../components/recoilState/productState', () => ({
  useProductState: jest.fn(() => ({
    allProducts: [],
    uniqueTypeDataArray: [
      {category: 'All', image: [image], type: 'Shirt'},
      {category: 'Electronics', image: [image], type: 'Bag'},
      {category: 'Fashion', image: [image], type: 'Dress'},
    ],
    uniqueCategoriesTitleArray: ['POPULAR', 'MEN', 'WOMEN', 'UNISEX'],
  })),
}));

jest.mock('../actions/productActions', () => ({
  fetchAllProducts: jest.fn(),
}));
jest.mock('../components/recoilState/globalState', () => ({
  useGlobalState: jest.fn(() => ({
    globalState: jest.fn(),
  })),
}));

describe('Categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Categories correctly', () => {
    const {getByText} = render(<Categories />);
    expect(getByText('POPULAR')).toBeTruthy();
    expect(getByText('MEN')).toBeTruthy();
    expect(getByText('WOMEN')).toBeTruthy();
    expect(getByText('UNISEX')).toBeTruthy();
  });

  it('handles clicking of title button correctly', () => {
    const {getByText} = render(<Categories />);
    act(() => {
      fireEvent.press(getByText('MEN'));
    });
    expect(getByText('MEN')).toHaveStyle({color: '#1FAB13'});
  });

  it('shows Spinner when isProductLoading is true', () => {
    (useProductState as jest.Mock).mockReturnValue({
      ...useProductState(),
      isProductLoading: true,
    });
    const {getByTestId} = render(<Categories />);

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('handles when product is empty ', () => {
    (useProductState as jest.Mock).mockReturnValue({
      ...useProductState(),
      allProducts: [],
      isProductLoading: false,
    });
    const {getByText} = render(<Categories />);

    expect(getByText('Empty')).toBeTruthy();
  });
});
