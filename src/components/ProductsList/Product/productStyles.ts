import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const productStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 27,
  },
  product: {
    borderWidth: 0,
  },
  productTitle: {
    fontWeight: 'bold',
    paddingBottom: 6,
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
  },
  price: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.GRADIENT_START,
  },
  productDescription: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    elevation: 1,
    flex: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 8,
    marginTop: -20,
    height: hp('13%'),
    width: 'auto',
  },
  horizontalImage: {
    height: hp('14%'),
    width: 'auto',
    marginTop: -32,
    marginHorizontal: 8,
  },
  fullImage: {
    height: hp('25%'),
    width: wp('91.5%'),
    marginTop: -27,
    marginHorizontal: 8,
  },
});
