import React from "react";
import { useQuery } from "@apollo/client";

import queries from "./queries";
import { Container, Logo, Flex, Box } from "./theme";
import Detail from "./Detail";
import Squad from "./Squad";
import Search from "./Search";

const App = () => {
  const { data } = useQuery(queries.GET_SELECTED_POKEMON);

  const selectedPokemon = data.selectedPokemon;

  return (
    <Container color="blue">
      <Logo src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />
      <Flex>
        <Box width={[1 / 4]}>
          <Search />
        </Box>
        <Box width={[3 / 4]}>
          {selectedPokemon && <Detail name={selectedPokemon.name} />}
        </Box>
      </Flex>
      <Box width={[4 / 4]}>
        <Squad />
      </Box>
    </Container>
  );
};

export default App;
