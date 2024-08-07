import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text} from 'react-native';
import {Button, Input, theme} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle from '../../constants/globalStyle';
import {useProductState} from '../recoilState/productState';
import {Product, DataLoader, Card} from '../index';
import {fetchAllProducts} from '../../actions/productActions';
import {width} from '../../constants/utils';
import {screen} from '../../constants/screens';
import {
  useGlobalState,
  GlobalStateProps,
} from '../../components/recoilState/globalState';
import {useAuthentication} from '../../actions/usersAction';

const ProductList = () => {
  fetchAllProducts();
  useAuthentication();
  const {allProducts, isProductLoading} = useProductState();
  const {setGlobalState} = useGlobalState();

  function handleNavigateToSearch() {
    const route = 'Search';
    setGlobalState((prev: GlobalStateProps) => ({
      ...prev,
      searchTitle: route,
    }));
    navigation.navigate(route);
  }

  const navigation = useNavigation<any>();

  const renderSearch = () => {
    return (
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Input
          right
          color="black"
          placeholderTextColor="grey"
          style={styles.search}
          iconContent={
            <Entypo
              size={16}
              color={globalStyle.COLORS.MUTED}
              name="camera"
              onPress={handleNavigateToSearch}
            />
          }
          testID="input"
          placeholder="What are you looking for?"
          onFocus={handleNavigateToSearch}
        />
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate(screen.categories)}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              size={20}
              color={globalStyle.COLORS.MUTED}
              name="grid"
              style={{paddingRight: 8}}
            />

            <Text style={styles.tabTitle}>Categories</Text>
          </View>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate(screen.bestDeals)}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: globalStyle.COLORS.MUTED}}
            />
            <Text style={styles.tabTitle}>Best Deals</Text>
          </View>
        </Button>
      </View>
    );
  };

  const renderProducts = () => {
    const firstRow = allProducts.slice(0, 1);
    const secondRow = allProducts.slice(1, 3);
    const thirdRow = allProducts.slice(3, 4);
    const fourthRow = allProducts.slice(4, 5);
    const otherRow = allProducts.slice(5, allProducts.length - 2);
    const lastRow = allProducts.slice(allProducts.length - 2);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
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
    <View style={styles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <Card minHeight={100} maxWidth={500}>
        {renderSearch()}

        {renderTabs()}
      </Card>

      <DataLoader
        size="large"
        style={{marginTop: 60}}
        isLoading={isProductLoading}
        array={allProducts}>
        {renderProducts()}
      </DataLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    width: width,
    paddingBottom: 70,
  },
  search: {
    height: 48,
    width: width - 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme?.COLORS?.WHITE,
    shadowColor: theme?.COLORS?.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 3,
    marginTop: 10,
    elevation: 4,
    flexDirection: 'row',
  },
  tab: {
    backgroundColor: theme?.COLORS?.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    fontSize: 16,
    color: 'black',
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: globalStyle.COLORS.MUTED,
  },
  products: {
    width: width - 16 * 2,
    paddingVertical: 16,
  },
});

export default ProductList;
