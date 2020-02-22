import React from "react";
import { useQuery } from "@apollo/client";
import queries from "./queries";
import { Flex, SquadItem } from "./theme";

const Squad = () => {
  const { loading, error, data } = useQuery(queries.GET_SQUAD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data === null) return <p>no squad</p>;

  const squad = data.squad;

  return (
    <Flex>
      {Array.from(Array(6).keys()).map(i => (
        <SquadItem
          key={i}
          color="white"
          bg={squad[i] ? squad[i].types[0].name : "grey"}
          width={[2 / 12]}
          m={2}
          p={2}
        >
          {squad[i] ? (
            <React.Fragment>
              <img src={squad[i].image} alt="" /> {squad[i].name}-
              {squad[i].levelUpMoves.map(move => (
                <div>{move}</div>
              ))}
            </React.Fragment>
          ) : (
            "empty"
          )}
        </SquadItem>
      ))}
    </Flex>
  );
};

export default Squad;
