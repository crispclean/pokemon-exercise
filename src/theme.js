import styled from "styled-components";
import { color, layout, flexbox, space, border } from "styled-system";

const theme = {
  colors: {
    blue: "#3a5d9f",
    yellow: "#fdcc07",
    white: "#ffffff",
    grey: "#c1c8ca",
    normal: "#a8a77a",
    fire: "#ee8130",
    water: "#6390f0",
    electric: "#f7d02c",
    grass: "#7ac74c",
    ice: "#96d9d6",
    fighting: "#c22e28",
    poison: "#a33ea1",
    ground: "#e2bf65",
    flying: "#a98ff3",
    psychic: "#f95587",
    bug: "#a6b91a",
    rock: "#b6a136",
    ghost: "#735797",
    dragon: "#6f35fc",
    dark: "#705746",
    steel: "#b7b7ce",
    fairy: "#d685ad"
  }
};

export const Flex = styled.div`
  display: flex;
  ${flexbox}
`;

export const Box = styled.div`
  ${layout};
  ${flexbox}
`;

export const SquadItem = styled.div`
  ${layout};
  ${color};
  ${flexbox};
  ${space};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LevelUpMove = styled.div`
  ${layout};
  ${color};
  ${flexbox};
  ${space};
  border: 1px solid ${theme.colors.blue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 200px;
`;

export const Container = styled.div`
  ${color};
  max-width: 980px;
  margin: 0 auto;
`;

export default theme;
