import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import metrics from '../../../config/metrics';

const POKEMON_PER_ROW = 3;
const BLOCK_PADDING = 20;

const pokemonQuery = gql`
  query {
    pokemons(first: 151) {
      number
      name
      image
    }
  }
`;


const Wrapper = styled.View`
  flex: 1;
`;

const PokemonBlock = styled.TouchableOpacity`
  align-items: center;
  flex-basis: ${100 / POKEMON_PER_ROW}%;
  border-style: solid;
  border-color: #eaeaea;
  border-top-width: ${props => (props.isFirstRow ? 0 : 1)}px;
  border-left-width: ${props => (props.isCenterBlock ? 1 : 0)}px;
  border-right-width: ${props => (props.isCenterBlock ? 1 : 0)}px;
`;

const PokemonThumb = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: ${BLOCK_PADDING}px;
  margin-bottom: ${BLOCK_PADDING}px;
`;

const PokemonTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const PokemonNumber = styled.Text`
  font-size: 14px;
  color: #cccccc;
`;

class MainScreen extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      }
    };
  }

  constructor(props) {
    super(props);
    this.onPokemonPress = this.onPokemonPress.bind(this);
  }

  onPokemonPress() {
    Navigation.push(this.props.componentId, {
      component: { name: 'DetailScreen' }
    });
  }

  render() {
    return (
      <Query query={pokemonQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Wrapper>
              <FlatList
                data={data.pokemons}
                keyExtractor={(item, index) => `pokemon-${item.number}`}
                renderItem={({item}) => (
                  <PokemonBlock onPress={this.onPokemonPress}>
                    <PokemonThumb source={{uri: item.image}} />
                    <Text>{item.name}</Text>
                  </PokemonBlock>
                )}
                numColumns={POKEMON_PER_ROW}
              />
            </Wrapper>
          )
        }}
      </Query>
    );
  }
}

export default MainScreen;
