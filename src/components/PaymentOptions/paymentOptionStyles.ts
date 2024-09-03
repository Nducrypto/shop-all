import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp, wp} from '../../config/appConfig';

export const paymentOptionsStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '500',
    marginBottom: hp('3%'),
    color: themes.COLORS.BLACK,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themes.COLORS.WHITE,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 15,
    marginVertical: 10,
    width: wp('90%'),
  },
  icon: {
    marginRight: wp('4%'),
  },
  optionText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
  },
});
