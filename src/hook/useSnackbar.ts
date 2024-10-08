import {atom, useRecoilState} from 'recoil';

export interface SnackBarState {
  text1: string;
  text2: string;
  type: string;
  isVisible: boolean;
}

export const snackbarState = atom<SnackBarState>({
  key: 'snackbarKey',
  default: {
    text1: '',
    text2: '',
    isVisible: false,
    type: '',
  },
});
export type SetSnackBarUpdate=(value:(prev:SnackBarState)=>SnackBarState)=>void

export const useSnackBarState = () => {
  const [snackBar, setSnackBar] = useRecoilState(snackbarState);
  const {text1, text2, type, isVisible} = snackBar;
  return {
    setSnackBar,
    text1,
    text2,
    type,
    isVisible,
  };
};

export const snackBarSuccess = (
  message: string,
  type: string,
  setSnackBar: SetSnackBarUpdate,
) => {
  setSnackBar((prev: SnackBarState) => ({
    ...prev,
    text2: message,
    type: type,
    isVisible: true,
  }));
};

export const snackBarFailure = (
  message: string,
  type: string,
  setSnackBar: SetSnackBarUpdate,
) => {
  setSnackBar((prev: SnackBarState) => ({
    ...prev,
    text2: message,
    type: type,
    isVisible: true,
  }));
};
