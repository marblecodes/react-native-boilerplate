import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import metrics from '../../../config/metrics';

const pokemonQuery = gql`
  query {
    pokemon(id: $id) {
      number
      name
      image
    }
  }
`;


const Wrapper = styled.View`
  flex: 1;
`;

class MainScreen extends Component {
  // static get options() {}

  render() {
    return (
      <Query query={pokemonQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Wrapper>
              <Text>Test</Text>
            </Wrapper>
          )
        }}
      </Query>
    );
  }
}

export default MainScreen;
