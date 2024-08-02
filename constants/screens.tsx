import {StackNavigationProp} from '@react-navigation/stack';

export const screen: any = {
  signIn: 'SignIn',
  signUp: 'SignUp',
  forgotPassword: 'ForgotPassword',
  homeStack: 'HomeStack',
  profileStack: 'ProfileStack',
  settingsStack: 'SettingsStack',
  customerCare: 'CustomerCare',
  addProduct: 'AddProduct',
  productList: 'ProductList',
  bestDeals: 'BestDeals',
  categories: 'Categories',
  search: 'Search',
  productDetail: 'ProductDetail',
  chat: 'Chat',
  orders: 'Orders',
  cart: 'Cart',
  profile: 'Profile',
  settings: 'Settings',
  notifications: 'Notifications',
  userAgreement: 'UserAgreement',
  privacy: 'Privacy',
  paymentOptions: 'PaymentOptions',
  giftCard: 'GiftCard',
  about: 'About',
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  HomeStack: undefined;
  ProfileStack: undefined;
  SettingsStack: undefined;
  CustomerCare: undefined;
  AddProduct: undefined;
  ProductList: undefined;
  BestDeals: undefined;
  Categories: undefined;
  Search: undefined;
  ProductDetail: undefined;
  Chat: undefined;
  Orders: undefined;
  Cart: undefined;
  Profile: undefined;
  Settings: undefined;
  Notifications: undefined;
  UserAgreement: undefined;
  Privacy: undefined;
  PaymentOptions: undefined;
  GiftCard: undefined;
  About: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
