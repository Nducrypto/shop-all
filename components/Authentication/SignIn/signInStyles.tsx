import {StyleSheet} from 'react-native';
import globalStyle from '../../../constants/globalStyle';

export const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    backgroundColor: globalStyle.COLORS.DARKGREEN,
    padding: 20,
  },

  iconsCon: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 90,
  },

  forgPass: {
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '500',
  },
  sharedText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  sharedCon: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 30,
  },
  faceIdBtn: {
    width: 130,
    alignSelf: 'center',
    padding: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  faceIdText: {
    color: 'white',
    marginTop: 10,
  },
});
