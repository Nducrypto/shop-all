import {screenNames,RootStackParamList} from '../screen';

import {atom, useRecoilState} from 'recoil';

export const initialUserState={
  role: "",
  email: "",
  userId: "",
  joined: "",
  docId: "",
  location: "",
  userName: "",
  profilePic: "",

}
export interface UserInterface {
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
  usersCollection: UserInterface[];
  currentUser: UserInterface ;
  isUserLoading: boolean;
  isAuthError: boolean | string;
  snackBarOpen: string|null;
  snackBarSeverity: string;
  previousRoute:  keyof RootStackParamList ;
  isFirstVisit: boolean;
}

export const userState = atom<AllUserState>({
  key: 'user',
  default: {
    currentUser: initialUserState,
    isUserLoading: false,
    usersCollection: [],
    isAuthError: false,
    snackBarOpen: null,
    snackBarSeverity: 'success',
    previousRoute:screenNames.productList,
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
