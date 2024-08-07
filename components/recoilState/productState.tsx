import {atom, useRecoilState} from 'recoil';

export interface ProductInterface {
  title: string;
  brand: string;
  productId: string;
  price: number;
  image: string[];
  discountedPrice?: number;
  productDetail?: string;
  likes: string[];
  category: string;
  subCategory: string;
  type: string;
}

export interface AllProductState {
  allProducts: ProductInterface[];
  isProductLoading: boolean;
  isProductError: boolean;
  currentId: string;
  uniqueSubCategory: Record<string, ProductInterface[]>;
  uniqueTypeDataArray: ProductInterface[];

  uniqueCategoriesTitleArray: string[];
}

export const productState = atom<AllProductState>({
  key: 'productKey',
  default: {
    allProducts: [],
    uniqueSubCategory: {},
    isProductLoading: false,
    isProductError: false,
    currentId: '',
    uniqueTypeDataArray: [],
    uniqueCategoriesTitleArray: [],
  },
});

export const useProductState = () => {
  const [product, setProduct] = useRecoilState(productState);
  const {
    allProducts,
    isProductLoading,
    isProductError,
    currentId,
    uniqueSubCategory,
    uniqueTypeDataArray,
    uniqueCategoriesTitleArray,
  } = product;

  return {
    allProducts,
    isProductLoading,
    isProductError,
    currentId,
    setProduct,
    uniqueSubCategory,
    uniqueCategoriesTitleArray,
    uniqueTypeDataArray,
  };
};

export const updateCurrentId = (setProduct: any, productId: string) => {
  setProduct((prev: AllProductState) => ({...prev, currentId: productId}));
  return true;
};
