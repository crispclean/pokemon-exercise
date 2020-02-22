import React from "react";
import { useMutation } from "@apollo/client";
import queries from "./queries";

const AddToSquadButton = ({ pokemon }) => {
  const [addToSquad] = useMutation(queries.ADD_TO_SQUAD, {
    variables: {
      pokemon
    }
  });

  return <button onClick={addToSquad}>add to squad</button>;
};

export default AddToSquadButton;
