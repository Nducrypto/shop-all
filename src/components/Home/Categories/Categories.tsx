import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {useProductState, ProductInterface} from '../../../hook/useProduct';
import {DataLoader, Card, CustomTitle} from '../../index';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../../screen';
import {useGlobalState, GlobalStateProps} from '../../../hook/useGlobal';
import {categoriesStyles} from './categoriesStyles';

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
    navigate(screenNames.search, {
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
    <View style={categoriesStyles.home}>
      <CustomTitle
        array={uniqueCategoriesTitleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DataLoader
          size="large"
          style={{marginTop: 60}}
          isLoading={isProductLoading}
          array={allProducts}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={categoriesStyles.products}>
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
                        style={categoriesStyles.background}
                        resizeMode="cover">
                        <View style={categoriesStyles.container}>
                          <Text style={categoriesStyles.text}>{item.type}</Text>
                        </View>
                      </ImageBackground>
                    </Card>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>
        </DataLoader>
      </ScrollView>
    </View>
  );
};

export default Categories;
