import {StyleSheet} from 'react-native';
import {hp} from '../../config/appConfig';
import themes from '../../config/themes';

export const getStartedStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: themes.COLORS.BLACK,
  },
  imageStyle: {
    height: hp('33%'),
    marginTop: hp('5%'),
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: themes.FONT_SIZES.EXTRALARGE,
    fontWeight: 'bold',
    color: themes.COLORS.WHITE,
    marginTop: hp('34%'),
  },
  desc: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '300',
    color: themes.COLORS.WHITE,
    marginTop: 30,
  },
  button: {
    top: hp('12%'),
  },
});
