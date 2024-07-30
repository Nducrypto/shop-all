import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  onSelect: (value: string, index: number) => void;
  style: {[key: string]: any};
  options: string[];
  defaultIndex: number;
  value: any;
  testID: string;
}
const Select = ({
  onSelect,
  style,
  options,
  defaultIndex,
  value,
  testID,
}: Props) => {
  return (
    <ModalDropdown
      defaultIndex={defaultIndex}
      style={[styles.qty, style]}
      onSelect={onSelect}
      options={options}
      dropdownStyle={styles.dropdown}
      dropdownTextStyle={{paddingLeft: 16, fontSize: 12}}>
      <View style={styles.valueCon} testID={testID}>
        <Text style={{fontSize: 12}}>{value}</Text>
        <FontAwesome name="angle-down" size={19} />
      </View>
    </ModalDropdown>
  );
};

const styles = StyleSheet.create({
  qty: {
    width: 100,
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
    height: 33,
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 100,
  },
  valueCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputIOS: {
    width: 80,
    fontSize: 14,

    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    width: 320,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#DCDCDC',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default Select;
