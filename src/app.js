import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './state/store';
import { registerScreens } from './screens';

export const startApp = () => {
  // Initiate the redux store
  const store = configureStore();

  // Register the screens
  registerScreens(store, Provider);

  // Listen to the App launch event
  Navigation.events().registerAppLaunchedListener(() => {
    // Initiate the navigation (a stack type in this case)
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: 'MainScreen'
            }
          }]
        }
      }
    });
  });
};
