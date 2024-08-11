import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {BestDeals} from '../src/components';
import {useProductState} from '../src/hook/useProduct';

const image =
  'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D';

jest.mock('../src/hook/useProduct', () => ({
  useProductState: jest.fn(() => ({
    allProducts: [{category: 'All', image: [image]}],
    uniqueSubCategory: ['POPULAR', 'FASHION', 'CAR', 'PHONE'],
  })),
}));
jest.mock('../src/hook/useGlobal', () => ({
  useGlobalState: jest.fn(() => ({
    globalState: jest.fn(),
  })),
}));

jest.mock('../src/actions/productActions', () => ({
  fetchAllProducts: jest.fn(),
}));

describe('Categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Best-deals correctly', () => {
    const {getByText} = render(<BestDeals />);
    expect(getByText('POPULAR')).toBeTruthy();
  });

  it('handles clicking of title button correctly', () => {
    const {getByText} = render(<BestDeals />);
    act(() => {
      fireEvent.press(getByText('POPULAR'));
    });
    expect(getByText('POPULAR')).toHaveStyle({color: '#1FAB13'});
  });

  it('shows Spinner when isProductLoading is true', () => {
    (useProductState as jest.Mock).mockReturnValue({
      ...useProductState(),
      isProductLoading: true,
    });
    const {getByTestId} = render(<BestDeals />);

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('handles when product is empty ', () => {
    (useProductState as jest.Mock).mockReturnValue({
      ...useProductState(),
      allProducts: [],
      isProductLoading: false,
    });
    const {getByText} = render(<BestDeals />);

    expect(getByText('Empty')).toBeTruthy();
  });
});
