import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import queries from "./queries";

export const typeDefs = gql`
  extend type Pokemon {
    isInSquad: Boolean!
    levelUpMoves: [Pokemon]
  }

  type Query {
    Pokemons: [Pokemon]
    squad: [Pokemon]
  }

  type Mutation {
    addToSquad(name: String!): Pokemon
    toggleMove(pokemon: Pokemon!, name: String!): Pokemon
  }
`;

const cache = new InMemoryCache();

export default new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.REACT_APP_POKE_ENDPOINT
  }),
  typeDefs,
  resolvers: {
    Pokemon: {
      isInSquad: (pokemon, _, { cache }) => {
        const queryResult = cache.readQuery({
          query: queries.GET_SQUAD
        });

        return Boolean(
          queryResult.squad.find(p => p && p.name === pokemon.name)
        );
      },
      levelUpMoves: (pokemon, _, { cache }) => {
        return [];
      }
    },
    Mutation: {
      addToSquad: (_, { pokemon }, { cache }) => {
        const result = cache.readQuery({
          query: queries.GET_SQUAD
        });

        if (result) {
          const { squad } = result;

          const data = squad.find(p => p.name === pokemon.name)
            ? { squad }
            : { squad: [...squad, pokemon] };

          cache.writeQuery({ query: queries.GET_SQUAD, data });

          return result.squad;
        }
      },
      toggleMove: (_, { pokemon, name }, { cache }) => {
        const oldLevelUpMoves = pokemon.levelUpMoves;

        const index = oldLevelUpMoves.indexOf(name);

        const newLevelUpMoves =
          index > -1
            ? oldLevelUpMoves.splice(name, index)
            : oldLevelUpMoves.push(name);

        const data = { Pokemon: { ...pokemon, newLevelUpMoves } };

        cache.writeQuery({ query: queries.GET_POKEMON, data });

        return pokemon;
      }
    }
  }
});

cache.writeData({
  data: {
    Pokemons: [],
    squad: [],
    selectedPokemon: null
  }
});
