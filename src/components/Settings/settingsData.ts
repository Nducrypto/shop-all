import {screenNames,RootStackParamList} from '../../screen';

export interface ITEMPROPS {
  title: string;
  id: string;
  type: string;
  screen: keyof RootStackParamList;
}

export const recommended:ITEMPROPS [] = [
  {
    title: 'Use FaceID to sign in',
    id: 'face',
    type: 'switch',
    screen: screenNames.settings,
  },
  {
    title: 'Auto-Lock security',
    id: 'autoLock',
    type: 'switch',
    screen: screenNames.settings,
  },
  {
    title: 'Notifications',
    id: 'Notifications',
    type: 'button',
    screen: screenNames.notifications,
  },
];

export const payment:ITEMPROPS [] = [
  {
    title: 'Manage Payment Options',
    id: 'Payment',
    type: 'button',
    screen: screenNames.paymentOptions,
  },
  {
    title: 'Manage Gift Cards',
    id: 'gift',
    type: 'button',
    screen: screenNames.giftCard,
  },
];

export const privacy:ITEMPROPS [] = [
  {
    title: 'User Agreement',
    id: 'Agreement',
    type: 'button',
    screen: screenNames.userAgreement,
  },
  {
    title: 'Privacy',
    id: 'Privacy',
    type: 'button',
    screen: screenNames.privacy,
  },
  {title: 'About', id: 'About', type: 'button', screen: screenNames.about},
];
