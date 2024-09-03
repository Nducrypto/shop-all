import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {useSnackBarState} from '../../hook/useSnackbar';
import {styles} from './toastStyles';

function CustomToast() {
  const {text2, type, setSnackBar, isVisible} = useSnackBarState();

  useEffect(() => {
    if (isVisible) {
      showToast();
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [isVisible]);

  const showToast = () => {
    Toast.show({
      type: 'tomatoToast',
      text1: type,
      text2: `👋 ${text2}`,
    });
  };
  const closeToast = () => {
    setSnackBar(prev => ({
      ...prev,
      isVisible: false,
      text1: '',
      text2: '',
      type: '',
    }));
  };
  const toastConfig = {
    tomatoToast: ({text1, text2}: {text1: string; text2: string}) => (
      <View style={text1 === 'success' ? styles.successCon : styles.errorCon}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    ),
  };

  if (!isVisible) {
    return null;
  } else {
    return <Toast config={toastConfig as ToastConfig} />;
  }
}

export default CustomToast;
