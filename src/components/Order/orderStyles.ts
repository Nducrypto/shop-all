import {StyleSheet} from 'react-native';
import themes from '../../config/themes';

export const orderStyles = StyleSheet.create({
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  orderList: {
    padding: 5,
  },
  title: {
    color: themes.COLORS.WHITE,
  },
  noOrderHeader: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    color: themes.COLORS.BLACK,
  },
  orderCard: {
    backgroundColor: themes.COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  orderHeader: {
    marginBottom: 10,
    backgroundColor: themes.COLORS.DARKGREEN,
    padding: 10,
    borderRadius: 10,
  },
  orderHeaderText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: 'bold',
    color: themes.COLORS.WHITE,
  },
  orderDetails: {
    flexDirection: 'column',
    // marginTop: hp('0.1%'),
  },
  subtotal: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
  },
  itemsList: {
    borderTopWidth: 1,
    borderColor: '#DDD',
    paddingTop: 10,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: 'bold',
    color: themes.COLORS.BLACK,
  },
  sharedText: {
    color: themes.COLORS.BLACK,
  },
  itemPrice: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.GRADIENT_START,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
