import React, {useEffect, useState} from 'react';
import {addProduct, updateProduct} from '../../../actions/productActions';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  ProductInterface,
  updateCurrentId,
  useProductState,
} from '../../../hook/useProduct';
import {useSnackBarState} from '../../../hook/useSnackbar.ts';
import {CustomButton, Product} from '../../';
import {wp} from '../../../config/appConfig.ts';
import {addProductStyles} from './addProductStyles.ts';

interface NewProduct {
  title: string;
  productDetail: string;
  brand: string;
  discountedPrice: number | string;
  price: number | string;
  likes: string[];
  image: string[];
  category: string;
  subCategory: string;
  type: string;
}
const initialState: NewProduct = {
  title: '',
  productDetail: '',
  brand: '',
  discountedPrice: '',
  price: '',
  likes: [],
  image: [],
  category: '',
  subCategory: '',
  type: '',
};

const AddProduct = () => {
  const [productForm, setProductForm] = useState<NewProduct | ProductInterface>(
    initialState,
  );
  const {allProducts, currentId, setProduct} = useProductState();
  const {setSnackBar} = useSnackBarState();
  const productToUpdate = allProducts.find(
    item => item.productId === currentId,
  );

  function handleNewProductChange(name: string, value: string) {
    if (name === 'image') {
      setProductForm(prevProduct => ({
        ...prevProduct,
        [name]: value.split(',').map((item: string) => item.trim()),
      }));
    } else {
      setProductForm(prevProduct => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    if (currentId && productToUpdate !== undefined) {
      setProductForm(productToUpdate);
    }
  }, [currentId]);

  function createProductHandler() {
    const data = {
      ...productForm,
      price: Number(productForm.price),
      discountedPrice: Number(productForm.discountedPrice),
    };
    if (currentId.length < 1) {
      addProduct(data as ProductInterface, setProduct, setSnackBar);
    } else {
      updateProduct(
        currentId,
        data as ProductInterface,
        setProduct,
        setSnackBar,
      );
    }
    setProductForm(initialState);
    updateCurrentId(setProduct, '');
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        <ScrollView
          horizontal
          contentContainerStyle={{marginHorizontal: 20, gap: 20}}>
          {allProducts.map(product => (
            <View key={product.productId} style={{width: 90}}>
              <Product product={product} />
            </View>
          ))}
        </ScrollView>
        <Text style={{...addProductStyles.label, textAlign: 'center'}}>
          You have {allProducts.length} products in Stock
        </Text>
        <View style={{margin: 20}}>
          <Text style={addProductStyles.label}>Add New Product</Text>
          <Text style={addProductStyles.label}>Title:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.title}
            onChangeText={text => handleNewProductChange('title', text)}
          />
          <Text style={addProductStyles.label}>Category:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.category}
            onChangeText={text => handleNewProductChange('category', text)}
          />
          <Text style={addProductStyles.label}>Sub Category:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.subCategory}
            onChangeText={text => handleNewProductChange('subCategory', text)}
          />
          <Text style={addProductStyles.label}>Type:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.type}
            onChangeText={text => handleNewProductChange('type', text)}
          />
          <Text style={addProductStyles.label}>Brand:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.brand}
            onChangeText={text => handleNewProductChange('brand', text)}
          />
          <Text style={addProductStyles.label}>Product Detail:</Text>
          <TextInput
            style={{
              ...addProductStyles.input,
              height: 100,
            }}
            value={productForm.productDetail}
            onChangeText={text => handleNewProductChange('productDetail', text)}
            multiline
          />
          <Text style={addProductStyles.label}>Price:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.price.toString()}
            onChangeText={value => handleNewProductChange('price', value)}
            keyboardType="numeric"
          />
          <Text style={addProductStyles.label}>Discounted Price:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.discountedPrice?.toString()}
            onChangeText={value =>
              handleNewProductChange('discountedPrice', value)
            }
            keyboardType="numeric"
          />
          <Text style={addProductStyles.label}>Image URL:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.image.join(', ')}
            onChangeText={text => handleNewProductChange('image', text)}
          />
          <View style={addProductStyles.btnCon}>
            <CustomButton
              title="ADD PRODUCT"
              width={wp('88%')}
              marginTop={10}
              testID="add-product-btn"
              onPress={() => createProductHandler()}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddProduct;
