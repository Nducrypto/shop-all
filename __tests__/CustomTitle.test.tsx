import React from 'react';
import {render} from '@testing-library/react-native';
import CustomTitle from '../components/Home/CustomTitle/CustomTitle';

describe('Custom Title', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders Custom-title correctly', () => {
    const choose = jest.fn;
    const {getByText} = render(
      <CustomTitle
        array={['POPULAR', 'FASHION', 'CAR', 'PHONE']}
        selectedTitle="FASHION"
        handleSelect={choose}
      />,
    );
    expect(getByText('POPULAR')).toBeTruthy();
    expect(getByText('FASHION')).toBeTruthy();
    expect(getByText('CAR')).toBeTruthy();
    expect(getByText('PHONE')).toBeTruthy();
  });
});
