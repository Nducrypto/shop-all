import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {wp, hp} from '../../config/appConfig';

export const productDetailStyles = StyleSheet.create({
  profile: {
    flex: 1,
    width: wp('100%'),
  },

  profileImage: {
    width: wp('100%'),
    height: hp('50%'),
  },
  profileContainer: {
    width: wp('100%'),
    height: hp('50%'),
  },

  carouselCon: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    textAlign: 'center',
    top: hp('40%'),
    flexDirection: 'row',
    gap: 10,
  },
  carousel: {
    paddingBottom: 8,
    color: 'red',
    backgroundColor: 'red',
    height: hp('1.2%'),
    width: wp('3%'),
  },
  optionsCon: {
    width: wp('100%'),
    alignItems: 'center',
    height: hp('50%'),
  },
  options: {
    position: 'relative',
    padding: 15,
    top: -30,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: themes.COLORS.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    width: wp('95%'),
    height: hp('50%'),
  },
  iconCon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -45,
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    height: wp('18%'),
    width: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('50%'),
  },
  nikeText: {
    marginBottom: 8,
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '500',
    color: themes.COLORS.BLACK,
    width: wp('50%'),
  },
  imgAndTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imgCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  avatar: {
    height: hp('7'),
    width: wp('15'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('50%'),
  },
  amount: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '700',
    color: themes.COLORS.BLACK,
    top: -13,
  },
  sharedText: {
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '700',
    color: themes.COLORS.BLACK,
  },
  seller: {
    marginRight: 10,
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },

  sizeCon: {
    flexDirection: 'row',
    width: wp('87%'),
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: themes.COLORS.DEFAULT,
    marginTop: 20,
  },
  sizeCell: {
    width: wp('28.8%'),
    borderBottomWidth: 1,
    borderColor: themes.COLORS.DEFAULT,
    borderRightWidth: 1,
    borderRightColor: themes.COLORS.DEFAULT,
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: hp('20%'),
    position: 'absolute',
  },
});
