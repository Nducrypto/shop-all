import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {styles} from './style';
import themes from '../../../config/themes';

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

export const icons = [
  {
    name: 'facebook-with-circle',
    color: 'blue',
    size: themes.ICONS.LARGE,
    id: 'facebook-login-icon',
    type: 'facebook',
  },
  {
    name: 'twitter-with-circle',
    color: '#5BC0DE',
    size: themes.ICONS.LARGE,
    id: 'twitter-login-icon',
    type: 'twitter',
  },
  {
    name: 'dribbble-with-circle',
    color: '#EA4C89',
    size: themes.ICONS.LARGE,
    id: 'dribbble-login-icon',
    type: 'dribbble',
  },
];
