import { Platform, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      justifyContent: 'center',
  
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
  });