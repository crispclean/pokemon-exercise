import React from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import queries from "./queries";
import Downshift from "downshift";

const Search = () => {
  const { loading, error, data } = useQuery(queries.GET_POKEMONS);
  const client = useApolloClient();

  const pokemons = data ? data.Pokemons : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Downshift
      onChange={selection => {
        client.writeData({
          data: { selectedPokemon: { name: selection.name } }
        });
      }}
      itemToString={item => (item ? item.name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <label {...getLabelProps()}>Select a Pokemon</label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? pokemons
                  .filter(item => !inputValue || item.name.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item.name}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default Search;
