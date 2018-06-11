import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

export function registerContainerWithRedux(containerName, comp, store, Provider) {
  const generatorWrapper = function() {
    const InternalComponent = comp;

    return class Scene extends Component {
      static options = {
        ...comp.options,
      }

      render() {
        return (
          <Provider store={store}>
            <InternalComponent
              ref="child"
              {...this.props}
            />
          </Provider>
        );
      }

      resendEvent(eventName, params) {
        const instance = this.refs.child.getWrappedInstance
          ? this.refs.child.getWrappedInstance()
          : this.refs.child;

        if (instance && instance[eventName]) {
          instance[eventName](params);
        }
      }

      componentDidAppear() {
        this.resendEvent('componentDidAppear');
      }

      componentDidDisappear() {
        this.resendEvent('componentDidDisappear');
      }

      componentWillUnmount() {
        this.resendEvent('componentWillUnmount');
      }

      componentWillReceiveProps(nextProps) {
        this.resendEvent('componentWillReceiveProps', nextProps);
      }

      onNavigationButtonPressed(buttonId) {
        this.resendEvent('onNavigationButtonPressed', buttonId);
      }
    };
  };

  Navigation.registerComponent(containerName, generatorWrapper);
}

export default registerContainerWithRedux;
