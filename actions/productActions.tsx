import {
  firestore,
  doc,
  collection,
  updateDoc,
  onSnapshot,
  getDocs,
} from '../components/config/firebase';
import {useEffect} from 'react';
import {
  AllProductState,
  ProductInterface,
  useProductState,
} from '../components/recoilState/productState';
import {removeInDatabase, createInDatabase} from '../constants/utils';
import {
  snackBarFailure,
  snackBarSuccess,
} from '../components/recoilState/snacbarState';
import {PRODUCTS} from '@env';

const productRoute = PRODUCTS;
export const addProduct = async (
  newProduct: ProductInterface,
  setProduct: (value: any) => void,
  setSnackBar: (value: any) => void,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));
  try {
    const productId = await createInDatabase(productRoute, newProduct);

    if (productId) {
      const data = {
        ...newProduct,
        productId,
      };
      setProduct((prev: AllProductState) => ({
        ...prev,
        allProducts: {...prev.allProducts, [data.productId]: {...data}},
        isProductLoading: false,
      }));
      snackBarSuccess('New product added successfully', 'success', setSnackBar);
    }
  } catch (error) {
    snackBarFailure('Failed To Create Product', 'error', setSnackBar);
    throw new Error();
  }
};

export const fetchAllProducts = () => {
  const {setProduct} = useProductState();

  useEffect(() => {
    setProduct(prevState => ({
      ...prevState,
      isProductLoading: true,
    }));

    const unsubscribe = onSnapshot(
      collection(firestore, productRoute),
      snapshot => {
        const fetchedData: ProductInterface[] = [];
        const uniqueCaTegories: Set<string | any> = new Set(['POPULAR']);
        const groupBySubCategories: Record<string, ProductInterface[]> = {};
        const uniqueType: Set<string | any> = new Set();
        const uniqueTypeDataArray: ProductInterface[] = [];

        snapshot.forEach(doc => {
          const product = {
            ...(doc.data() as ProductInterface),
            productId: doc.id,
          };
          fetchedData.push(product);
          if (!groupBySubCategories[product.subCategory]) {
            groupBySubCategories[product.subCategory] = [];
          }
          groupBySubCategories[product.subCategory].push(product);
          if (!uniqueType.has(product?.type)) {
            uniqueType.add(product.type);
            uniqueTypeDataArray.push(product);
          }
          if (
            !uniqueCaTegories.has(product?.category) &&
            product.category !== 'All'
          ) {
            uniqueCaTegories.add(product.category);
          }
        });

        setProduct(prevState => ({
          ...prevState,
          allProducts: [...fetchedData],
          uniqueSubCategory: groupBySubCategories,
          uniqueTypeDataArray,
          uniqueCategoriesTitleArray: Array.from(uniqueCaTegories),
          isProductLoading: false,
        }));
      },
    );

    return () => {
      unsubscribe();
    };
  }, [setProduct]);
};
export const updateProduct = async (
  productId: string,
  newProduct: any,
  setProduct: any,
  setSnackBar: any,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));

  const productIdRef = doc(firestore, productRoute, productId);

  try {
    await updateDoc(productIdRef, newProduct);
    setProduct((prevState: AllProductState) => ({
      ...prevState,
      isProductLoading: false,
    }));
    snackBarSuccess('Product updated successfully', 'success', setSnackBar);
  } catch (error: any) {
    snackBarFailure('Failed To update Product', 'error', setSnackBar);
    throw new Error();
  }
};

export const removeProduct = async (
  productId: string,
  setProduct: any,
  setSnackBar: any,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));

  try {
    const success = await removeInDatabase(productRoute, productId);

    if (success) {
      setProduct((prev: AllProductState) => {
        const newState = {...prev};
        newState.allProducts = {...newState.allProducts};
        newState.allProducts = newState.allProducts.filter(
          product => product.productId !== productId,
        );
        return newState;
      });
      snackBarSuccess('Product deleted successfully', 'success', setSnackBar);
    }
  } catch (error) {
    snackBarFailure('Failed to delete product', 'error', setSnackBar);
    throw new Error();
  }
};

const updateProductAll = async () => {
  try {
    const collectionRef = collection(firestore, productRoute);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach(async docSnapshot => {
      const docRef = doc(firestore, productRoute, docSnapshot.id);
      const data = docSnapshot.data();

      if (data.brand === 'Oraimo') {
        await updateDoc(docRef, {
          subCategory: 'Phone',
        });
      }
    });
  } catch (error) {}
};
