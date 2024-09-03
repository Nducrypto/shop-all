import { StyleSheet } from "react-native";
import themes from "../../../config/themes";


export const forgotPasswordStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themes.COLORS.DARKGREEN,
    },
    text: {
      textAlign: 'center',
      color: 'white',
      marginBottom: 40,
      fontSize: 15,
      fontWeight: '700',
    },
    remPasswordButt: {
      alignSelf: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    remPasswordText: {
      fontSize: 14,
      color: 'white',
    },
    link: {
      color: 'white',
  
      fontSize: 14,
    },
  });
  