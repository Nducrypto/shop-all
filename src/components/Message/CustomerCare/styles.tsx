import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: themes.COLORS.DARKGREEN,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  content: {
    flex: 1,
    padding: 16,
  },
  messages: {
    flexGrow: 1,
    marginBottom: 40,
  },
  selected: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgrey',
  },
  notSelected: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  email: {
    fontSize: 18,
    color: 'black',
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    maxWidth: '70%',
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageRole: {
    color: 'white',
  },
  messageText: {
    color: 'black',
  },
  messageDate: {
    color: 'black',
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: '200',
    textAlign: 'right',
  },
  messageStatus: {
    alignSelf: 'flex-end',
  },

  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    width: wp('78%'),
    height: hp('5%'),

    marginLeft: 15,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
  },
});
