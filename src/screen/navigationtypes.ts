import {StackNavigationProp} from '@react-navigation/stack';
import { ProductInterface } from '../hook/useProduct';



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
    Search:{ type?: string; category: string };
    ProductDetail: ProductInterface;
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
  export type DynamicNavigationProps = {
    navigate: <K extends keyof RootStackParamList>(
      screen: K,
      params?: RootStackParamList[K]
    ) => void;
   
  };
  