import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
    // textDecorationLine: "blue",
    // marginTop: 15,
    // flexDirection: "row",
    // justifyContent: "space-around",
    // borderColor: "grey",
    // borderWidth: 2,
  },
  notSelected: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  email: {
    fontSize: 18,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    maxWidth: '70%',
    borderRadius: 8,
  },
  messageRole: {
    color: 'white',
  },
  messageText: {
    color: 'white',
  },
  messageStatus: {
    alignSelf: 'flex-end',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});
