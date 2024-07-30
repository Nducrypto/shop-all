import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useProductState} from '../../recoilState/productState';
import {DataLoader, Card, CustomTitle} from '../../index';
import {width} from '../../../constants/utils';

const Categories = () => {
  const {
    allProducts,
    isProductLoading,
    uniqueCategoriesTitleArray,
    uniqueCaTegoriesDataArray,
  } = useProductState();
  const firstElement = uniqueCategoriesTitleArray[0];
  const [selectedTitle, setSelectedTitle] = useState<string>(firstElement);

  const filteredArray =
    selectedTitle === firstElement
      ? uniqueCaTegoriesDataArray
      : uniqueCaTegoriesDataArray.filter(
          item => item.category === selectedTitle,
        );

  return (
    <View style={styles.home}>
      <CustomTitle
        array={uniqueCategoriesTitleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <DataLoader
        size="large"
        style={{marginTop: 60}}
        isLoading={isProductLoading}
        array={allProducts}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>
          <View>
            {filteredArray.map((item, index) => (
              <View key={index} style={{marginTop: 30}}>
                {item.category !== 'All' && (
                  <Card minHeight={234} maxWidth={430}>
                    <ImageBackground
                      source={{
                        uri: item.image[0],
                      }}
                      style={styles.background}
                      resizeMode="cover">
                      <View style={styles.container}>
                        <Text style={styles.text}>{item.category}</Text>
                      </View>
                    </ImageBackground>
                  </Card>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </DataLoader>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  home: {
    width: width,
    flex: 1,
    alignItems: 'center',

    paddingBottom: 30,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  products: {
    width: width - 16 * 2,
    paddingVertical: 4,
    paddingBottom: 20,
  },
});
