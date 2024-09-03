import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    height: hp('7%'),

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  input: {
    color: 'white',
    width: wp('80%'),
    height: hp('6%'),
  },
});
