import {StyleSheet} from 'react-native';
import {wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const privacyPolicyStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: themes.COLORS.BLACK,
    marginTop: 16,
  },
  buttonCon: {
    flexDirection: 'row',
    width: themes.SIZES.FULLWIDTH,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    padding: 15,
    width: wp('40%'),
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  buttonText: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontWeight: '300',
    fontSize: themes.FONT_SIZES.SMALL,
  },
});
