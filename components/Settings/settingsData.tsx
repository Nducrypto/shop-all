import {screen} from '../../constants/screens';

export const recommended = [
  {
    title: 'Use FaceID to sign in',
    id: 'face',
    type: 'switch',
    screen: '',
  },
  {
    title: 'Auto-Lock security',
    id: 'autoLock',
    type: 'switch',
    screen: '',
  },
  {
    title: 'Notifications',
    id: 'Notifications',
    type: 'button',
    screen: screen.notifications,
  },
];

export const payment = [
  {
    title: 'Manage Payment Options',
    id: 'Payment',
    type: 'button',
    screen: screen.paymentOptions,
  },
  {
    title: 'Manage Gift Cards',
    id: 'gift',
    type: 'button',
    screen: screen.giftCard,
  },
];

export const privacy = [
  {
    title: 'User Agreement',
    id: 'Agreement',
    type: 'button',
    screen: screen.userAgreement,
  },
  {title: 'Privacy', id: 'Privacy', type: 'button', screen: screen.privacy},
  {title: 'About', id: 'About', type: 'button', screen: screen.about},
];
