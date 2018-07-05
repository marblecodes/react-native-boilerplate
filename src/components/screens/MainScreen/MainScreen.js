import React, { Component, Fragment } from 'react';
import { FlatList, Text } from 'react-native';
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

const Header = styled.View`
  align-items: center;
  padding-top: ${2 * metrics.statusbarHeight}px;
  padding-bottom: ${metrics.statusbarHeight}px;
  background-color: ${props => props.theme.colors.pokemonRed};
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`

const PokemonBlock = styled.TouchableOpacity`
  align-items: center;
  flex-basis: ${100 / POKEMON_PER_ROW}%;
`;

const PokemonThumb = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: ${BLOCK_PADDING}px;
  margin-bottom: ${BLOCK_PADDING/2}px;
`;

const PokemonTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.colors.darkgray};
`;

const PokemonNumber = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.gray};
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

  onPokemonPress(pokemon) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'DetailScreen',
        passProps: {
          pokemon
        }
      }
    });
  }

  render() {
    return (
      <Query query={pokemonQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Fragment>
              <Header>
                <HeaderTitle>Dex</HeaderTitle>
              </Header>
              <FlatList
                data={data.pokemons}
                keyExtractor={(item, index) => `pokemon-${item.number}`}
                renderItem={({item}) => (
                  <PokemonBlock onPress={() => this.onPokemonPress(item)}>
                    <PokemonThumb source={{uri: item.image}} />
                    <PokemonTitle>{item.name}</PokemonTitle>
                    <PokemonNumber>{item.number}</PokemonNumber>
                  </PokemonBlock>
                )}
                numColumns={POKEMON_PER_ROW}
                ItemSeparatorComponent={() => (null)}
              />
            </Fragment>
          )
        }}
      </Query>
    );
  }
}

export default MainScreen;
