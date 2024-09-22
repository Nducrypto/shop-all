import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 13,
    paddingVertical: 20,
  },

  emptyCartCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
    fontWeight: '600',
    padding: 12,
  },
  subTotalCont: {
    flexDirection: 'row',
  },
  subTotalLabel: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '500',
    color: themes.COLORS.BLACK,
  },
  subTotalValue: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.ERROR,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 20,
  },
  viewSavedItemtext: {
    color: themes.COLORS.DARKGREEN,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },
  itemCon: {
    marginVertical: 20,
    marginTop: 20,
  },
  imgAndTextCon: {
    flexDirection: 'row',
    width: wp('62%'),
    gap: 10,
  },
  productTitle: {
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: 'bold',
    color: 'black',
  },
  productDescription: {
    paddingTop: 5,
    height: hp('11.5%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inStockCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('55%'),
  },
  inStockText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  price: {
    color: themes.COLORS.GRADIENT_START,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 8,
    top: -17,
    height: hp('14.5%'),
    width: wp('28%'),
  },

  groupedButCon: {
    flexDirection: 'row',
    gap: wp('4%'),
    marginTop: -10,
    marginBottom: 4,
  },
  optionsButton: {
    width: wp('33%'),
    height: hp('3.5%'),
    color: themes.COLORS.BLACK,
    backgroundColor: themes.COLORS.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: '#4A4A4A',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -1,
  },
  spinner: {
    marginTop: hp('25%'),
  },
});
