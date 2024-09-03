import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp, wp} from '../../../config/appConfig';

const {COLORS, FONT_SIZES} = themes;

export const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: themes.COLORS.WHITE,
  },
  header: {
    justifyContent: 'center',
    backgroundColor: COLORS.DARKGREEN,
    height: hp('30%'),
    paddingLeft: wp('5%'),
  },

  avatar: {
    marginBottom: hp('1.2%'),
    marginTop: hp('12%'),
    height: hp('6'),
    width: wp('13%'),
    borderRadius: hp('50%'),
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  userName: {
    fontSize: FONT_SIZES.LARGE,
    color: COLORS.WHITE,
  },
  statusCon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menuCon: {
    marginTop: hp('3'),
  },
  menu: {
    paddingHorizontal: wp('2%'),
  },
  menuItem: {
    borderRadius: 9,
  },

  profile: {
    // marginBottom: 4,
  },

  proCon: {
    backgroundColor: COLORS.LABEL,
    paddingHorizontal: 6,
    borderRadius: 4,
    height: hp('2.5%'),
    width: hp('5%'),
    marginRight: wp('4%'),
  },
  pro: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.WHITE,
  },
  seller: {
    marginRight: wp('4%'),
    fontSize: FONT_SIZES.MEDIUM,
    color: themes.COLORS.WHITE,
    fontWeight: '300',
  },
  rating: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.WARNING,
  },
  authButtonCon: {
    flex: 0.4,
    paddingLeft: wp('9'),
  },
  authBut: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  authText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.BLACK,
  },
});
