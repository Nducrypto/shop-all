import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: themes.COLORS.BLACK,
    fontWeight: '700',
  },
  welcomeText: {
    textAlign: 'center',
    marginTop: 100,
    color: themes.COLORS.BLACK,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarMessCon: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    height: hp('5%'),
    width: wp('10%'),
    borderRadius: 50,
  },
  messages: {
    flexGrow: 1,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: hp('1.3%'),
    maxWidth: wp('50%'),
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: themes.COLORS.WHITE,
    color: themes.COLORS.BLACK,
    flexWrap: 'nowrap',
  },
  messageText: {
    color: themes.COLORS.BLACK,
    paddingVertical: 2,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  messageDate: {
    color: themes.COLORS.BLACK,
    paddingVertical: 2,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '200',
    textAlign: 'right',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    width: wp('78%'),
    marginLeft: 15,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    color: themes.COLORS.BLACK,
    backgroundColor: themes.COLORS.WHITE,
    height: hp('5%'),
  },
});
