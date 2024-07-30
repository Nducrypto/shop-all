import {screen} from '../../constants/screens';
import {atom, useRecoilState} from 'recoil';

export interface CollectionInterface {
  role: string;
  email: string;
  userId: string;
  joined: string;
  docId: string;
  location: string;
  userName: string;
  profilePic: string;
}

interface AllUserState {
  usersCollection: CollectionInterface[];
  currentUser: CollectionInterface | any;
  isUserLoading: boolean;
  isAuthError: boolean | string;
  snackBarOpen: string | null;
  snackBarSeverity: string;
  previousRoute: string;
  isFirstVisit: boolean;
}

export const userState = atom<AllUserState>({
  key: 'user',
  default: {
    currentUser: null,
    isUserLoading: false,
    usersCollection: [],
    isAuthError: false,
    snackBarOpen: null,
    snackBarSeverity: 'success',
    previousRoute: screen.productList,
    isFirstVisit: true,
  },
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  const {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
    isFirstVisit,
  } = user;

  return {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
    setUser,
    isFirstVisit,
  };
};
