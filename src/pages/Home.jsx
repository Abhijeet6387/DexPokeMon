import React from "react";
import { Header, PokemonList, Navigation, Search } from "../components";

const Home = () => {
  return (
    <>
      <Header />
      <Search />
      <Navigation />
      <PokemonList />
    </>
  );
};

export default Home;
