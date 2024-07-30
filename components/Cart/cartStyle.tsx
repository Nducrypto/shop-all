import {StyleSheet} from 'react-native';
import globalStyle from '../../constants/globalStyle';
import {height, width} from '../../constants/utils';

export const styles = StyleSheet.create({
  subTotalCont: {
    flexDirection: 'row',
  },
  subTotalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  subTotalValue: {
    fontSize: 16,
    color: globalStyle.COLORS.ERROR,
    fontWeight: 'bold',
  },

  itemCon: {
    marginVertical: 20,
    marginTop: 30,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imgAndTextCon: {
    flexDirection: 'row',
    width: width / 2,
    gap: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  productDescription: {
    paddingTop: 5,
    height: 90,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inStockCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
    height: 30,
    width: width / 1.88,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 8,
    top: -17,
    height: height / 7,
    width: width / 4,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  groupedButCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 16,
    color: 'black',
  },
  optionsText: {
    fontSize: 12,
    color: '#4A4A4A',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
  },
});
