import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import themes from '../../../config/themes';
import {useProductState} from '../../../hook/useProduct';
import {Product, DataLoader, Card} from '../../index';
import {fetchAllProducts} from '../../../actions/productActions';
import {NavigationProps, screenNames} from '../../../screen';
import {useAuthentication} from '../../../actions/usersAction';
import {productsStyles} from './productsStyles';

const Products = () => {
  fetchAllProducts();
  useAuthentication();
  const [searchType, setSearchType] = useState<string>('');

  const {allProducts, isProductLoading} = useProductState();

  const navigation = useNavigation<NavigationProps>();

  const filteredProducts = searchType
    ? allProducts.filter(item => item.type.includes(searchType))
    : allProducts;

  const renderSearch = () => {
    return (
      <View style={productsStyles.inputCon}>
        <TextInput
          style={productsStyles.input}
          placeholderTextColor="grey"
          testID="input"
          placeholder="What are you looking for?"
          onChangeText={value => setSearchType(value)}
        />
        <Entypo
          size={themes.ICONS.SMALL}
          color={themes.COLORS.MUTED}
          name="camera"
          disabled={!searchType}
        />
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={productsStyles.tabs}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[productsStyles.tab, productsStyles.divider]}
          onPress={() => navigation.navigate(screenNames.categories)}>
          <Entypo
            size={20}
            color={themes.COLORS.MUTED}
            name="grid"
            style={{paddingRight: 8}}
          />

          <Text style={productsStyles.tabTitle}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={productsStyles.tab}
          onPress={() => navigation.navigate(screenNames.bestDeals)}>
          <Entypo
            size={16}
            name="camera"
            style={{paddingRight: 8, color: themes.COLORS.MUTED}}
          />
          <Text style={productsStyles.tabTitle}>Best Deals</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProducts = () => {
    const firstRow = filteredProducts.slice(0, 1);
    const secondRow = filteredProducts.slice(1, 3);
    const thirdRow = filteredProducts.slice(3, 4);
    const fourthRow = filteredProducts.slice(4, 5);
    const otherRow = filteredProducts.slice(5, allProducts.length - 2);
    const lastRow = filteredProducts.slice(allProducts.length - 2);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={productsStyles.products}>
        {firstRow.map((product, index) => (
          <Product product={product} horizontal key={index} />
        ))}
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
          }}>
          {secondRow.map((product, index) => (
            <Product product={product} style={{top: 10}} key={index} />
          ))}
        </View>

        {thirdRow.map((product, index) => (
          <Product product={product} horizontal key={index} />
        ))}

        {fourthRow.map((product, index) => (
          <Product
            product={product}
            full={true}
            key={index}
            style={{top: 10}}
          />
        ))}
        {otherRow.map((product, index) => (
          <Product product={product} horizontal key={index} />
        ))}
        {lastRow.map((product, index) => (
          <Product
            product={product}
            full={true}
            key={index}
            style={{top: 10}}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={productsStyles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <Card minHeight={100} maxWidth={500}>
        {renderSearch()}

        {renderTabs()}
      </Card>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DataLoader
          size="large"
          style={{marginTop: 60}}
          isLoading={isProductLoading}
          array={filteredProducts}>
          {renderProducts()}
        </DataLoader>
      </ScrollView>
    </View>
  );
};

export default Products;
