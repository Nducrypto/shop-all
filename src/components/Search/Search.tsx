import React, {useEffect, useState} from 'react';
import {View, ScrollView, StatusBar, TextInput} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Product, DataLoader, Card} from '../index';
import {useProductState, ProductInterface} from '../../hook/useProduct';
import {searchStyles} from './searchStyles';
import {productsStyles} from '../ProductsList/Products/productsStyles';
import themes from '../../config/themes';

interface ProductRouteParams {
  category?: string;
  type?: string;
}

type RootStackParamList = {
  ProductSearch: ProductRouteParams;
};

const Search = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'ProductSearch'>>();
  const searchCategory = params?.category ?? '';
  const type = params?.type ?? '';
  const [searchType, setSearchType] = useState<string>(type);
  const [filteredProduct, setFilteredProduct] = useState<ProductInterface[]>(
    [],
  );

  const {allProducts, isProductLoading} = useProductState();

  const handleSearch = () => {
    const filter = allProducts.filter(item =>
      !searchCategory
        ? item.type.toLowerCase() === searchType.toLowerCase()
        : item.type.toLowerCase() === searchType.toLowerCase() &&
          item.category.toLowerCase() === searchCategory.toLowerCase(),
    );
    setFilteredProduct(filter);
  };

  useEffect(() => {
    function performSearch() {
      if (searchCategory && !searchType) {
        const filter = allProducts.filter(
          item => item.category.toLowerCase() === searchCategory.toLowerCase(),
        );
        setFilteredProduct(filter);
      } else if (!searchType && !searchCategory) {
        setFilteredProduct(allProducts);
      }
    }
    performSearch();
  }, [searchType, searchCategory, allProducts]);

  useEffect(() => {
    if (searchCategory && searchType) {
      handleSearch();
    }
  }, []);

  return (
    <View style={searchStyles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <Card minHeight={100} maxWidth={themes.SIZES.FULLWIDTH} paddingLeft={0}>
        <View style={productsStyles.inputCon}>
          <TextInput
            style={productsStyles.input}
            placeholderTextColor="grey"
            testID="input"
            placeholder="Search..."
            onChangeText={text => setSearchType(text)}
            value={searchType}
          />
          <Entypo
            size={themes.ICONS.SMALL}
            color={themes.COLORS.MUTED}
            name="camera"
            onPress={handleSearch}
            disabled={!searchType}
          />
        </View>
      </Card>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <DataLoader
          size="large"
          style={{marginTop: 60}}
          isLoading={isProductLoading}
          array={filteredProduct}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={searchStyles.products}>
            {filteredProduct.map((product, index) => (
              <Product product={product} horizontal key={index} />
            ))}
          </ScrollView>
        </DataLoader>
      </ScrollView>
    </View>
  );
};

export default Search;
