import {StyleSheet} from 'react-native';
import {wp} from '../../../config/appConfig';

export const shoppedStyles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  shoppedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemCon: {
    gap: 10,
    minWidth: wp('100%'),
  },
  item: {
    marginTop: 30,
    width: wp('40%'),
  },
});
