import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp, wp} from '../../../config/appConfig';

export const productsStyles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    width: wp('100%'),
    paddingBottom: 10,
  },
  inputCon: {
    height: hp('5%'),
    width: wp('95.4%'),
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: hp('5%'),
    width: wp('88'),
    paddingLeft: 10,
    color: 'black',
  },

  tabs: {
    marginBottom: 3,
    marginTop: 10,
    elevation: 4,
    flexDirection: 'row',
    gap: 39,
    justifyContent: 'center',
    paddingBottom: 5,
    alignItems: 'center',
    paddingLeft: 10,
  },
  tab: {
    backgroundColor: 'transparent',
    width: wp('35.4%'),
    height: hp('2.6%'),
    elevation: 0,
    flexDirection: 'row',
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: 'black',
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: themes.COLORS.MUTED,
  },
  products: {
    width: wp('95%'),
    paddingVertical: 16,
  },
});
