import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

const BLOCK_PADDING = 20;
const MAX_CP = 3904; // Mewtwo
const MAX_HP = 4144; // Mewtwo

const pokemonQuery = gql`
  query PokemonQuery($name: String!) {
    pokemon(name: $name) {
      number
      name
      image
      types
      maxHP
      maxCP
      resistant
      weaknesses
      evolutions {
        name
        number
        image
      }
    }
  }
`;

const Wrapper = styled.ScrollView`
  flex: 1;
  padding: ${BLOCK_PADDING}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${BLOCK_PADDING}px;
  border-bottom-color: ${props => props.theme.colors.lightgray};
  border-bottom-width: 1px;
`;

const HeaderNumber = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.gray};
`;

const PokemonThumb = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: ${BLOCK_PADDING}px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const HeaderTitle = Title.extend`
  margin-bottom: ${BLOCK_PADDING/2}px;
`;

const SectionTitle = Title.extend`
  margin-top: ${BLOCK_PADDING}px;
  margin-bottom: ${BLOCK_PADDING/2}px;
`;

const StatisticWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${BLOCK_PADDING/2}px;
`;

const StatisticTitle = styled.Text`
  margin-right: ${BLOCK_PADDING}px;
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.gray};
`;

const StatisticBar = styled.View`
  position: relative;
  flex: 1;
  background-color: ${props => props.theme.colors.lightgray};
  border-radius: 2px;
`;

const StatisticBarFill = styled.View`
  height: ${BLOCK_PADDING/2}px;
  width: ${props => (props.value / props.max * 100)}%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 2px;
`;

const StatisticBarHandle = styled.View`
  position: absolute;
  top: 0;
  left: ${props => (props.value / props.max * 100)}%;
  transform: translateY(-5px) translateX(-${props => props.value < 1000 ? 18 : 22}px);
  padding: ${BLOCK_PADDING/8}px ${BLOCK_PADDING/4}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray};
  border-radius: ${BLOCK_PADDING/4}px;
  background: #ffffff;
`

const StatisticBarLabel = styled.Text`
  font-size: 12px;
  line-height: 13px;
`;

const TagList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TypeTag = styled.View`
  margin-right: ${BLOCK_PADDING/4}px;
  margin-bottom: ${BLOCK_PADDING/4}px;
  padding: ${BLOCK_PADDING/4}px ${BLOCK_PADDING/2}px;
  border-radius: 2px;
  background: ${props => props.theme.colors[props.type]};
`;

const TypeTagLabel = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
`;

const EvolutionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${BLOCK_PADDING/4}px;
  margin-bottom: ${BLOCK_PADDING/2}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray};
  border-radius: ${BLOCK_PADDING/4}px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
`;

class DetailScreen extends Component {
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
      <Query query={pokemonQuery} variables={{ name: this.props.pokemon.name }}>
        {({ loading, error, data }) => {
          if (loading) return <Wrapper><Text>Loading...</Text></Wrapper>;
          if (error) return <Wrapper><Text>{`Error! ${error.message}`}</Text></Wrapper>;

          const {
            number,
            name,
            image,
            types,
            maxHP,
            maxCP,
            resistant,
            weaknesses,
            evolutions
          } = data.pokemon;

          return (
            <Wrapper>
              <Header>
                <PokemonThumb source={{uri: image}} />
                <View>
                  <HeaderNumber>#{number}</HeaderNumber>
                  <HeaderTitle>{name}</HeaderTitle>
                  <TagList>
                    {types.map(type => (
                      <TypeTag type={type.toLowerCase()} key={`type-${type}`}>
                        <TypeTagLabel>{type.toUpperCase()}</TypeTagLabel>
                      </TypeTag>
                    ))}
                  </TagList>
                </View>
              </Header>
              <SectionTitle>Statistics</SectionTitle>
              <StatisticWrapper>
                <StatisticTitle>Max CP</StatisticTitle>
                <StatisticBar>
                  <StatisticBarFill value={maxCP} max={MAX_CP} />
                  <StatisticBarHandle value={maxCP} max={MAX_CP}>
                    <StatisticBarLabel>{maxCP}</StatisticBarLabel>
                  </StatisticBarHandle>
                </StatisticBar>
              </StatisticWrapper>
              <StatisticWrapper>
                <StatisticTitle>Max HP</StatisticTitle>
                <StatisticBar>
                  <StatisticBarFill value={maxHP} max={MAX_HP} />
                  <StatisticBarHandle value={maxHP} max={MAX_HP}>
                    <StatisticBarLabel>{maxHP}</StatisticBarLabel>
                  </StatisticBarHandle>
                </StatisticBar>
              </StatisticWrapper>
              {weaknesses && weaknesses.length && (
                <Fragment>
                  <SectionTitle>Weaknesses</SectionTitle>
                  <TagList>
                    {weaknesses.map(weakness => (
                      <TypeTag type={weakness.toLowerCase()} key={`weakness-${weakness}`}>
                        <TypeTagLabel>{weakness.toUpperCase()}</TypeTagLabel>
                      </TypeTag>
                    ))}
                  </TagList>
                </Fragment>
              )}
              {resistant && resistant.length && (
                <Fragment>
                  <SectionTitle>Resistant</SectionTitle>
                  <TagList>
                    {resistant.map(resists => (
                      <TypeTag type={resists.toLowerCase()} key={`resists-${resists}`}>
                        <TypeTagLabel>{resists.toUpperCase()}</TypeTagLabel>
                      </TypeTag>
                    ))}
                  </TagList>
                </Fragment>
              )}
              {evolutions && evolutions.length && (
                <Fragment>
                  <SectionTitle>Evolutions</SectionTitle>
                  {evolutions.map(evolution => (
                    <EvolutionContainer
                      key={`evolution-${evolution.name}`}
                      onPress={() => this.onPokemonPress(evolution)}
                    >
                      <PokemonThumb source={{uri: evolution.image}} />
                      <Title>{evolution.number} - {evolution.name}</Title>
                    </EvolutionContainer>
                  ))}
                </Fragment>
              )}
            </Wrapper>
          )
        }}
      </Query>
    );
  }
}

export default DetailScreen;
