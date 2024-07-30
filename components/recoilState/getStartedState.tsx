import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

import {atom, useRecoilState} from 'recoil';

export interface GetStarted {
  hasUserVisitedBefore: boolean;
}

const state = atom<GetStarted>({
  key: 'getStartedKey',
  default: {
    hasUserVisitedBefore: true,
  },
});

export function useGetStarted() {
  const [getStarted, setGetStarted] = useRecoilState(state);
  const {hasUserVisitedBefore} = getStarted;

  useEffect(() => {
    const loadCartStateFromStorage = async () => {
      try {
        const hasVisited = await AsyncStorage.getItem('getStarted');

        if (hasVisited === null) {
          setGetStarted((prev: GetStarted) => ({
            ...prev,
            hasUserVisitedBefore: false,
          }));
        }
      } catch (error) {
        throw new Error('failed to update get Started');
      }
    };

    loadCartStateFromStorage();
  }, []);
  return {hasUserVisitedBefore, setGetStarted};
}
