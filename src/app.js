import { Navigation } from 'react-native-navigation';
import ApolloClient from "apollo-boost";
import configureStore from './state/store';
import { registerScreens } from './screens';

export const startApp = () => {
  // Initiate the redux store
  const store = configureStore();

  // Initiate the Apolli client
  const client = new ApolloClient({
    uri: 'https://graphql-pokemon.now.sh'
  });

  // Register the screens
  registerScreens(store, client);

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
