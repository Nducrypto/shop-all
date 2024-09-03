import React from 'react';
import {View, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {selectStyles} from './selectStyles';

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
      style={selectStyles.qty}
      onSelect={onSelect}
      options={options}
      animated={true}
      isFullWidth={true}
      saveScrollPosition={true}
      dropdownStyle={selectStyles.dropdown}
      showsVerticalScrollIndicator={false}
      dropdownTextStyle={selectStyles.dropDownTextStyle}>
      <View style={selectStyles.valueCon} testID={testID}>
        <Text style={selectStyles.value}>{value[id] ?? 1}</Text>
        <FontAwesome name="angle-down" size={19} color="black" />
      </View>
    </ModalDropdown>
  );
};

export default Select;
