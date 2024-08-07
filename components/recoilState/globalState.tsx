import React from 'react';
import {atom, useRecoilState} from 'recoil';
import {ProductInterface} from './productState';

export interface GlobalStateProps {
  searchTitle: string;
  recentlyViewed: ProductInterface[];
}

const initialState = atom<GlobalStateProps>({
  key: 'globalStateKey',
  default: {
    searchTitle: 'Search',
    recentlyViewed: [],
  },
});

export function useGlobalState() {
  const [globalState, setGlobalState] = useRecoilState(initialState);
  const {searchTitle, recentlyViewed} = globalState;

  return {searchTitle, recentlyViewed, setGlobalState};
}
