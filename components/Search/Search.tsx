import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import {Input} from 'galio-framework';
import {useRoute, RouteProp} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle from '../../constants/globalStyle';
import {Product, DataLoader, Card} from '../index';
import {width} from '../../constants/utils';
import {useProductState, ProductInterface} from '../recoilState/productState';

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
    <View style={styles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <Card minHeight={100} maxWidth={width} paddingLeft={0}>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <Input
            right
            color="black"
            placeholderTextColor="grey"
            style={{
              height: 48,
              borderWidth: 1,
              borderRadius: 3,
              color: 'red',
            }}
            iconContent={
              <Entypo
                size={16}
                color={globalStyle.COLORS.MUTED}
                name="camera"
                onPress={handleSearch}
                disabled={!searchType}
              />
            }
            placeholder="Search..."
            onChangeText={text => setSearchType(text)}
            value={searchType}
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
            contentContainerStyle={styles.products}>
            {filteredProduct.map((product, index) => (
              <Product product={product} horizontal key={index} />
            ))}
          </ScrollView>
        </DataLoader>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    width: width,
    paddingBottom: 10,
  },
  search: {
    height: 48,
    width: width - 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },

  products: {
    width: width - 16 * 2,
    paddingVertical: 16,
  },
});

export default Search;
