import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {NavigationProps} from '../../screen';
import themes from '../../config/themes';

const MenuToggleIcon = () => {
  const navigation = useNavigation<NavigationProps>();
  function handleOpenDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }
  return (
    <View>
      <Entypo
        size={themes.ICONS.MEDIUM}
        color="grey"
        name="menu"
        onPress={handleOpenDrawer}
        style={{marginLeft: 10}}
      />
    </View>
  );
};

export default MenuToggleIcon;

const styles = StyleSheet.create({});
