import { gql } from "@apollo/client";

const POKEMON_TILE = gql`
  fragment PokemonTile on Pokemon {
    id
    name
    image
    isInSquad @client
    levelUpMoves @client
  }
`;

const GET_POKEMONS = gql`
  query Pokemons {
    Pokemons(first: 151) {
      ...PokemonTile
    }
  }
  ${POKEMON_TILE}
`;

const GET_POKEMON = gql`
  query Pokemon($name: String!) {
    Pokemon(name: $name) {
      ...PokemonTile
      types {
        name
      }
      abilities {
        name
      }
      moves {
        name
        type
        learnMethod
      }
      stats {
        name
        value
      }
    }
  }
  ${POKEMON_TILE}
`;

const GET_SELECTED_POKEMON = gql`
  query getSelectedPokemon {
    selectedPokemon @client
  }
`;

const GET_SQUAD = gql`
  query getSquad {
    squad @client
  }
`;

const ADD_TO_SQUAD = gql`
  mutation addToSquad($pokemon: Pokemon!) {
    addToSquad(pokemon: $pokemon) @client
  }
`;

const TOGGLE_MOVE = gql`
  mutation toggleMove($pokemon: Pokemon!, $name: name!) {
    toggleMove(pokemon: $pokemon, name: $name) @client
  }
`;

export default {
  GET_POKEMONS,
  GET_POKEMON,
  GET_SELECTED_POKEMON,
  ADD_TO_SQUAD,
  TOGGLE_MOVE,
  GET_SQUAD
};
