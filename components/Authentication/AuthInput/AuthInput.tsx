import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {height, width} from '../../../constants/utils';

interface InputWithIconProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName?: string;
}

const AuthInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
}: InputWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  return (
    <View
      style={{
        ...styles.container,
        ...(value && {
          borderBottomColor: 'gray',
        }),
      }}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="lightgrey"
        onChangeText={onChangeText}
        secureTextEntry={
          placeholder === 'Password' || placeholder === 'Confirm Password'
            ? !showPassword
            : false
        }
      />
      {iconName === 'lock' && (
        <TouchableOpacity onPress={() => togglePasswordVisibility()}>
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="lightgrey"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthInput;
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    height: height / 13.34,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  input: {
    color: 'white',
    width: width / 1.25,
    height: 50,
  },
});
