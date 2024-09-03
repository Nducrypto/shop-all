import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import themes from '../../../config/themes';
import {customeTitleStyles} from './ customeTitleStyles';

interface Props {
  array: string[];
  selectedTitle: string;
  handleSelect: (value: string) => void;
}
const CustomTitle = ({array, selectedTitle, handleSelect}: Props) => {
  return (
    <View style={customeTitleStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={customeTitleStyles.titleCon}>
        {array.map(item => (
          <View key={item}>
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              activeOpacity={0.8}>
              <Text
                key={item}
                style={{
                  ...customeTitleStyles.tabTitle,
                  ...(item === selectedTitle && {
                    color: themes.COLORS.BUTTON_COLOR,
                    fontWeight: '400',
                  }),
                }}>
                {item?.toUpperCase()}
              </Text>
            </TouchableOpacity>
            {item === selectedTitle && (
              <View style={customeTitleStyles.horizontalLine} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomTitle;
