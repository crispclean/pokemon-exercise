import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import queries from "./queries";
import AddToSquadButton from "./AddToSquadButton";
import ToggleMoveButton from "./ToggleMoveButton";
import { Flex, Box, LevelUpMove } from "./theme";

const Detail = ({ name }) => {
  const { loading, error, data } = useQuery(queries.GET_POKEMON, {
    variables: { name }
  });

  const pokemon = data && data.Pokemon;

  if (loading) return <p>Loading...</p>;
  if (error) console.error(error);
  if (!pokemon) return <p>No pokemon found</p>;

  return (
    <Flex>
      <Box width={[1 / 4]}>
        <img src={pokemon.image} alt="" />
        <h2>{pokemon.name}</h2>

        {!pokemon.isInSquad && <AddToSquadButton pokemon={pokemon} />}
      </Box>
      <Box width={[2 / 4]}>
        <h3>Stats</h3>
        {pokemon.stats.map(stat => (
          <div key={stat.name}>
            {stat.name}: {stat.value}
          </div>
        ))}

        {!!pokemon.levelUpMoves.length && (
          <React.Fragment>
            <h3>Level up moves</h3>
            <Flex>
              <LevelUpMove width={[2 / 4]} p="2">
                {pokemon.levelUpMoves.map(move => (
                  <React.Fragment>{move}</React.Fragment>
                ))}
              </LevelUpMove>
            </Flex>
          </React.Fragment>
        )}
      </Box>
      <Box width={[2 / 4]}>
        <h3>Level up</h3>
        {pokemon.moves.map(
          move =>
            move.learnMethod === "level-up" && (
              <ToggleMoveButton
                key={move.name}
                pokemon={pokemon}
                name={move.name}
              />
            )
        )}
      </Box>
    </Flex>
  );
};

export default Detail;
