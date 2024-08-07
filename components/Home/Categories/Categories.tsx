import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useProductState,
  ProductInterface,
} from '../../recoilState/productState';
import {DataLoader, Card, CustomTitle} from '../../index';
import {width} from '../../../constants/utils';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screen} from '../../../constants/screens';
import {
  useGlobalState,
  GlobalStateProps,
} from '../../../components/recoilState/globalState';

const Categories = () => {
  const {navigate} = useNavigation<NavigationProps>();
  const {
    allProducts,
    isProductLoading,
    uniqueCategoriesTitleArray,
    uniqueTypeDataArray,
  } = useProductState();
  const firstElement = uniqueCategoriesTitleArray[0];
  const [selectedTitle, setSelectedTitle] = useState<string>(firstElement);
  const {setGlobalState} = useGlobalState();

  const handleNavigation = (item: ProductInterface) => {
    const {category, type} = item;
    const isCategoryAll = category === 'All';
    setGlobalState((prev: GlobalStateProps) => ({
      ...prev,
      searchTitle: isCategoryAll ? 'Unisex' : category,
    }));
    navigate(screen.search, {
      type: type,
      category: category,
    });
  };
  const filteredArray =
    selectedTitle === firstElement
      ? uniqueTypeDataArray
      : uniqueTypeDataArray.filter(
          item => item.category.toLowerCase() === selectedTitle.toLowerCase(),
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
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleNavigation(item)}>
                <View style={{marginTop: 30}}>
                  <Card minHeight={234} maxWidth={430}>
                    <ImageBackground
                      source={{
                        uri: item.image[0],
                      }}
                      style={styles.background}
                      resizeMode="cover">
                      <View style={styles.container}>
                        <Text style={styles.text}>{item.type}</Text>
                      </View>
                    </ImageBackground>
                  </Card>
                </View>
              </TouchableWithoutFeedback>
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
    textTransform: 'capitalize',
  },
  products: {
    width: width - 16 * 2,
    paddingVertical: 4,
    paddingBottom: 20,
  },
});
