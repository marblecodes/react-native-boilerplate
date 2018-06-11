import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../config/theme';
import metrics from '../../../config/metrics';

class MainScreen extends Component {
  static get options() {
    return {
      _statusBar: {
        backgroundColor: 'transparent',
        style: 'dark',
        drawBehind: true
      },
      topBar: {
        title: {
          title: 'My Screen'
        },
        largeTitle: {
          visible: false,
        },
        drawBehind: true,
        visible: false,
        animate: false
      }
    };
  }

  componentDidMount() {
    console.log('screen mounted');
  }

  render() {
    return (
      <View style={styles.viewWrapper}>
        <Text>Hello bootstrapped app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: metrics.statusbarHeight,
  },
});

export default MainScreen;
