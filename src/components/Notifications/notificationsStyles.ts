import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp} from '../../config/appConfig';

export const notificationStyles = StyleSheet.create({
  settings: {
    paddingVertical: 15,
  },
  headerLabel: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  desc: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    textAlign: 'center',
    fontWeight: '700',
    paddingBottom: 20,
  },
  titleCon: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleAndSwiCon: {
    height: hp('5%'),
    paddingHorizontal: 12,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '500',
  },
  rows: {
    height: hp('5%'),
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});
