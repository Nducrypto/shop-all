module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^firebase/app$': '<rootDir>/_mocks_/firebase/app.ts',
    '^firebase/auth$': '<rootDir>/_mocks_/firebase/auth.ts',
    '^firebase/firestore$': '<rootDir>/_mocks_/firebase/firestore.ts',
    '^firebase/storage$': '<rootDir>/_mocks_/firebase/storage.ts',
    '^recoil$': '<rootDir>/_mocks_/recoil.ts',
    '^@react-navigation/native$':
      '<rootDir>/__mocks__/@react-navigation/native.ts',
    '^@react-navigation/stack$':
      '<rootDir>/__mocks__/@react-navigation/stack.ts',
    '^greact-native-fbsdk-next$':
      '<rootDir>/_mocks_/react-native-fbsdk-next.ts',
    '^react-native-quick-crypto$':
      '<rootDir>/_mocks_/react-native-quick-crypto.ts',
    '^react-native-paystack-webview$':
      '<rootDir>/_mocks_/react-native-paystack-webview.ts',
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/@react-native-async-storage/async-storage.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|recoil|@react-navigation|firebase|recoil)',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['./node_modules/'],
};
