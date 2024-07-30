import globalStyle from '../../constants/globalStyle';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  successCon: {
    height: 45,
    width: '95%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: globalStyle.COLORS.DARKGREEN,
  },
  errorCon: {
    height: 60,
    width: '95%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'darkred',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});
