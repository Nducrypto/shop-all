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
}

export const productState = atom<AllProductState>({
  key: 'productKey',
  default: {
    allProducts: [],
    uniqueSubCategory: {},
    isProductLoading: false,
    isProductError: false,
    currentId: '',
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
  } = product;

  const uniqueCaTegories: Set<string | any> = new Set(['POPULAR']);
  const uniqueCaTegoriesDataArray = [];

  for (const item of allProducts) {
    if (!uniqueCaTegories.has(item?.category) && item.category !== 'All') {
      uniqueCaTegories.add(item.category);
      uniqueCaTegoriesDataArray.push(item);
    }
  }

  const uniqueCategoriesTitleArray = Array.from(uniqueCaTegories);

  return {
    allProducts,
    isProductLoading,
    isProductError,
    currentId,
    setProduct,
    uniqueSubCategory,
    uniqueCategoriesTitleArray,
    uniqueCaTegoriesDataArray,
  };
};

export const updateCurrentId = (setProduct: any, productId: string) => {
  setProduct((prev: AllProductState) => ({...prev, currentId: productId}));
  return true;
};
