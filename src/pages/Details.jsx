import React, { useEffect } from "react";
import "../styles/details.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, Loading, Navigation, Search } from "../components";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { progressBarColor, capitalizeFirstLetter } from "../utils/functions";
import {
  fetchSinglePokemonDetail,
  removePokemon,
  updateActiveRoute,
  savePokemonImage,
} from "../store/pokemon";

const Details = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const { pokemon, loading, pokemonImages } = useSelector(
    (state) => state.pokemon
  );
  useEffect(() => {
    dispatch(fetchSinglePokemonDetail(name.toLowerCase()));
    dispatch(updateActiveRoute(null));
    return () => {
      dispatch(removePokemon());
    };
  }, [dispatch, name]);

  useEffect(() => {
    if (pokemon && pokemon.length !== 0 && !pokemonImages[pokemon.id]) {
      dispatch(
        savePokemonImage({
          id: pokemon.id,
          image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
        })
      );
    }
  }, [dispatch, pokemon, pokemonImages]);

  return (
    <>
      <Header />
      <Search />
      <Navigation />

      {loading ? (
        <Loading />
      ) : pokemon && pokemon.length === 0 ? (
        <section className="listing-main">
          <div className="listing">No Pokemon Found</div>
        </section>
      ) : null}
      {pokemon && pokemon.length !== 0 && (
        <section className="listing-main">
          <div className="listing">
            <div className="listing-head">
              <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
            </div>
            <div className="details-section">
              <div className="details-left">
                <img
                  src={
                    pokemonImages[pokemon.id]
                      ? pokemonImages[pokemon.id]
                      : "placeholder_image_url"
                  }
                  alt={pokemon.name}
                />
              </div>
              <div className="details-right">
                <Tabs>
                  <TabList>
                    <Tab>Stats</Tab>
                    <Tab>About</Tab>
                    <Tab>Moves</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="details-stats">
                      {pokemon.stats.map((item, index) => {
                        return (
                          <div key={index} className="stats">
                            <p>{capitalizeFirstLetter(item.stat.name)}</p>
                            <span>{item.base_stat}</span>
                            <div>
                              <p
                                style={{
                                  backgroundColor: progressBarColor(
                                    item.base_stat
                                  ),
                                  width: `${item.base_stat}%`,
                                  maxWidth: "100%",
                                }}
                              ></p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="details-about">
                      <div className="title">
                        <p>Species</p>
                        <span>
                          {capitalizeFirstLetter(pokemon.species.name)}
                        </span>
                      </div>
                      <div className="title">
                        <p>Weight</p>
                        <span>{pokemon.weight / 10} (Kg)</span>
                      </div>
                      <div className="title">
                        <p>Height</p>
                        <span>{pokemon.height / 10} (m)</span>
                      </div>
                      <div className="title">
                        <p>Abilities</p>
                        <span>
                          {pokemon.abilities.map(
                            (item, index) =>
                              `${
                                pokemon.abilities.length - 1 !== index
                                  ? `${item.ability.name}, `
                                  : item.ability.name
                              }`
                          )}
                        </span>
                      </div>
                      <div className="title">
                        <p>Types</p>
                        <span>
                          {pokemon.types.map((item, index) =>
                            pokemon.types.length - 1 !== index
                              ? `${item.type.name}, `
                              : item.type.name
                          )}
                        </span>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="details-moves">
                      {pokemon.moves.map((item, index) => (
                        <p key={index}>{item.move.name}</p>
                      ))}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
