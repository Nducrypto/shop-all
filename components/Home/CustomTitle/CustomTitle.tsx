import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/globalStyle';
import {width} from '../../../constants/utils';

interface Props {
  array: string[];
  selectedTitle: string;
  handleSelect: (value: string) => void;
}
const CustomTitle = ({array, selectedTitle, handleSelect}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.titleCon}>
        {array.map(item => (
          <View key={item}>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text
                key={item}
                style={{
                  ...styles.tabTitle,
                  ...(item === selectedTitle && {
                    color: globalStyle.COLORS.BUTTON_COLOR,
                    fontWeight: '400',
                  }),
                }}>
                {item?.toUpperCase()}
              </Text>
            </TouchableOpacity>
            {item === selectedTitle && <View style={styles.horizontalLine} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomTitle;
console.log(width / 5);

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  titleCon: {
    gap: 50,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 10,
    backgroundColor: 'white',
    minWidth: width,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    fontSize: 16,
    color: 'black',
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: globalStyle.COLORS.BUTTON_COLOR,
    marginTop: 8,
    width: '130%',
    alignSelf: 'center',
  },
});
