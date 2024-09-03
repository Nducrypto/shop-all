import {StyleSheet} from 'react-native';
import {wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const categoriesStyles = StyleSheet.create({
  home: {
    width: themes.SIZES.FULLWIDTH,
    flex: 1,
    alignItems: 'center',

    paddingBottom: 30,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  products: {
    width: wp('93%'),
    paddingVertical: 4,
    paddingBottom: 20,
  },
});
