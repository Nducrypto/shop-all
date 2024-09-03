import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';

export const customeTitleStyles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  titleCon: {
    gap: 50,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 10,
    backgroundColor: 'white',
    minWidth: themes.SIZES.FULLWIDTH,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    fontSize: 16,
    color: 'black',
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: themes.COLORS.BUTTON_COLOR,
    marginTop: 8,
    width: '130%',
    alignSelf: 'center',
  },
});
