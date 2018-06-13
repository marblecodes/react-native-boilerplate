# React-Native Boilerplate

A basic React-Native setup combining the following libraries:

- react-native-navigation
- redux + redux-thunk (re-ducks setup)
- graphql
- styled-components

## Requirements

- `react-native-cli`, follow the "Building Projects with Native Code" [Getting started](https://facebook.github.io/react-native/docs/getting-started.html) guide
- [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

## Use

Clone this repo and point your command line to the folder

```bash
# Install dependencies
yarn

# Run it, for example for iOS
react-native run-ios
```

## TODO

[] Detail screen query and visualisation
[] Styling
[] Animations / transitions
[] Implement eslint
[] Write tests

## Notes
- Using React-Native 0.54.4 due to [an existing bug in 0.55.4](https://github.com/wix/react-native-navigation/issues/3019).
- Using a redux HOC found in [this issue](https://github.com/wix/react-native-navigation/issues/1642).
