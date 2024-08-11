import {StyleSheet} from 'react-native';
import {wp, hp} from '../../config/appConfig';
import themes from '../../config/themes';

const thumbMeasure = wp('27%');

export const profileStyles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  profileImage: {
    width: themes.SIZES.FULLWIDTH,
    height: themes.SIZES.HALFHEIGHT,
  },
  profileContainer: {
    width: themes.SIZES.FULLWIDTH,
    height: themes.SIZES.HALFHEIGHT,
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },

  nameAndLoCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profileTexts: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    zIndex: 2,
  },
  proCon: {
    flexDirection: 'row',
  },
  pro: {
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    paddingHorizontal: 6,
    marginRight: 10,
    borderRadius: 4,
    height: hp('2.5%'),
    width: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCon: {
    color: themes.COLORS.WARNING,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  sharedText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.WHITE,
    fontWeight: '600',
  },
  seller: {
    marginRight: 10,
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  options: {
    position: 'relative',
    padding: 15,
    marginHorizontal: 12,
    marginTop: -15,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: themes.COLORS.WHITE,
    shadowColor: themes.COLORS.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    height: themes.SIZES.HALFHEIGHT,
  },
  labelSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelCon: {
    alignItems: 'center',
  },
  label: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: 'black',
  },
  value: {
    marginBottom: 8,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '400',
    color: themes.COLORS.BLACK,
  },
  viewLabelCon: {
    paddingVertical: 16,
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: thumbMeasure,
    position: 'absolute',
  },

  recentlyViewedText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: 'black',
    fontWeight: '700',
  },
  recentlyViewed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  viewAllText: {
    fontSize: 12,
    color: themes.COLORS.GRADIENT_START,
    fontWeight: '500',
  },
});
