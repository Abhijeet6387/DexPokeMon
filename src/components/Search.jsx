import React, { useState, useEffect } from "react";
import "../styles/search.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedType, updateFilteredPokemons } from "../store/pokemon";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon.pokemonData);
  const selectedType = useSelector((state) => state.pokemon.selectedType);
  const filteredPokemons = useSelector(
    (state) => state.pokemon.filteredPokemons
  );

  useEffect(() => {
    filterPokemons(selectedType);
  }, [selectedType, pokemonList]);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    dispatch(updateSelectedType(type));
  };

  const filterPokemons = (type) => {
    if (!type || !pokemonList.length) {
      dispatch(updateFilteredPokemons([]));
      return;
    }
    const filtered = pokemonList.filter((pokemon) => {
      return pokemon.types.some((pokeType) => pokeType.type.name === type);
    });

    // console.log(filtered);

    dispatch(updateFilteredPokemons(filtered));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pokemon/${searchValue.trimStart()}`);
  };

  return (
    <section className="search-main">
      <div className="search">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Search</button>
          <div className="filter-section">
            <select id="type" onChange={handleTypeChange}>
              <option value="">All</option>
              <option value="normal">Normal</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="electric">Electric</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
              <option value="stellar">Stellar</option>
            </select>
          </div>
        </form>
        <div className="search-example">
          <p id="eg">Eg.</p>
          <Link to="/pokemon/bulbasaur">
            <p>bulbasaur</p>
          </Link>
          <Link to="/pokemon/pikachu">
            <p>pikachu</p>
          </Link>
          <Link to="/pokemon/raichu">
            <p>raichu</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Search;
