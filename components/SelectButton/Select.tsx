import globalStyle from '../../constants/globalStyle';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  onSelect: (value: string, index: number) => void;
  options: string[];
  defaultIndex: number;
  value: Record<string, number>;
  testID: string;
  id: string;
}
const Select = ({
  onSelect,

  options,
  defaultIndex,
  value,
  testID,
  id,
}: Props) => {
  return (
    <ModalDropdown
      defaultIndex={defaultIndex}
      style={styles.qty}
      onSelect={onSelect}
      options={options}
      animated={true}
      isFullWidth={true}
      saveScrollPosition={true}
      dropdownStyle={styles.dropdown}
      showsVerticalScrollIndicator={false}
      dropdownTextStyle={{paddingLeft: 16, fontSize: 12, color: 'black'}}>
      <View style={styles.valueCon} testID={testID}>
        <Text style={styles.value}>{value[id] ?? 1}</Text>
        <FontAwesome name="angle-down" size={19} color="black" />
      </View>
    </ModalDropdown>
  );
};

const styles = StyleSheet.create({
  qty: {
    width: 100,
    backgroundColor: globalStyle.COLORS.DEFAULT,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
    height: 35,
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
  },
  valueCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  value: {
    fontSize: 12,
    color: '#4A4A4A',
  },
});

export default Select;
