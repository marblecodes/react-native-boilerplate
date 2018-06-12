import React from 'react';
import { Navigation } from 'react-native-navigation';
import registerContainerWithProviders from '../lib/registerContainerWithProviders';

import MainScreen from '../components/screens/MainScreen';
import DetailScreen from '../components/screens/DetailScreen';

/**
 * HOC to wrap a provided screen in a redux provider
 * @param {Component} sceneComp A component to register to a route
 * @param {Object}    store     A redux store instance
 */
function sceneCreator (sceneComp, store) {
  return () => {
    class SceneWrapper extends React.Component {
      render () {
        return <Provider store={store}>{React.createElement(sceneComp)}</Provider>
      }
    }
  }
}

/**
 *
 * @param {Object}    store    A redux store instance
 * @param {Component} Provider A redux provider HOC
 */
export const registerScreens = (store, client) => {
  registerContainerWithProviders('MainScreen', MainScreen, store, client);
  registerContainerWithProviders('DetailScreen', DetailScreen, store, client);
}
