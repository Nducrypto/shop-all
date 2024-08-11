import {StyleSheet} from 'react-native';
import {hp} from '../../config/appConfig';
import themes from '../../config/themes';

export const settingStyles = StyleSheet.create({
  content: {
    marginTop: hp('2%'),
  },
  settings: {
    paddingVertical: 15,
  },
  headerLabel: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
    color: themes.COLORS.BLACK,
  },
  subHeaderLabel: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '500',
  },
  titleCon: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleAndSwiCon: {
    height: hp('5%'),
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rows: {
    height: hp('5%'),
    paddingHorizontal: 12,
    marginBottom: hp('1%'),
  },
  sharedText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
  },
});
