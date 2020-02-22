import React from "react";
import { useMutation } from "@apollo/client";
import queries from "./queries";

const ToggleMoveButton = ({ pokemon, name }) => {
  const [toggleMove] = useMutation(queries.TOGGLE_MOVE, {
    variables: { pokemon, name }
  });

  return <div onClick={toggleMove}>{name}</div>;
};

export default ToggleMoveButton;
