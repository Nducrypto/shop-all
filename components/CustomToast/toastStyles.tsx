import globalStyle from '../../constants/globalStyle';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  successCon: {
    height: 45,
    width: '95%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: globalStyle.COLORS.SUCCESS,
  },
  errorCon: {
    height: 60,
    width: '95%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: globalStyle.COLORS.ERROR,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});
