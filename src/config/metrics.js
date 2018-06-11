import { StatusBar, Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const STATUSBAR_HEIGHT = StatusBar.currentHeight || IS_ANDROID ? 24 : 20;
const { width, height } = Dimensions.get('window');
const NAVBAR_HEIGHT = Platform.select({
  ios: 64,
  android: 54,
});

export default {
  isAndroid: IS_ANDROID,
  statusbarHeight: STATUSBAR_HEIGHT,
  navbarHeight: NAVBAR_HEIGHT,
  deviceHeight: height - (IS_ANDROID ? STATUSBAR_HEIGHT : 0),
  deviceWidth: width,
};
