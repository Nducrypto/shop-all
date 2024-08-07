import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useProductState} from '../../recoilState/productState';
import {width} from '../../../constants/utils';
import {Product, DataLoader, CustomTitle} from '../../index';

const BestDeals = () => {
  const {allProducts, isProductLoading, uniqueSubCategory} = useProductState();

  const [selectedTitle, setSelectedTitle] = useState<string>('Popular');
  const titleArray = uniqueSubCategory
    ? ['Popular', ...Object.keys(uniqueSubCategory)]
    : ['Popular', 'Fashion', 'Car', 'Phone'];

  const filteredProduct =
    selectedTitle === 'Popular'
      ? allProducts.slice(0, 10)
      : uniqueSubCategory[selectedTitle];

  const firstRow = filteredProduct.slice(0, 1);
  const secondRow = filteredProduct.slice(1, 3);
  const thirdRow = filteredProduct.slice(3, 4);
  const fourthRow = filteredProduct.slice(4, 5);
  const otherRow = filteredProduct.slice(5, allProducts.length - 2);
  const lastRow = filteredProduct.slice(allProducts.length - 2);

  return (
    <View style={styles.home}>
      <CustomTitle
        array={titleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center', maxWidth: width}}>
        <DataLoader
          size="large"
          style={{marginTop: 60}}
          isLoading={isProductLoading}
          array={allProducts}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              ...styles.productsContainer,
            }}>
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
              <Product
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
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
              <Product
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
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
        </DataLoader>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    width,
    flex: 1,
  },

  productsContainer: {
    width: width - 16 * 2,
    paddingVertical: 32,
  },
});

export default BestDeals;
