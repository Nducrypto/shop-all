import {StyleSheet} from 'react-native';
import {hp} from '../../../src/config/appConfig';
import themes from '../../config/themes';

export const customButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    padding: hp('1.5'),
    // padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
