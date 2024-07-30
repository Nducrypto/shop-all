import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

import {atom, useRecoilState} from 'recoil';

export interface GlobalStateProps {
  searchTitle: string;
}

const initialState = atom<GlobalStateProps>({
  key: 'globalStateKey',
  default: {
    searchTitle: 'Search',
  },
});

export function useGlobalState() {
  const [globalState, setGlobalState] = useRecoilState(initialState);
  const {searchTitle} = globalState;

  return {searchTitle, setGlobalState};
}
