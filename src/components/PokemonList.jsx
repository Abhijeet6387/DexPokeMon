import React, { useEffect } from "react";
import "../styles/listing.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "./index";
import { capitalizeFirstLetter } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, savePokemonImage } from "../store/pokemon";
import InfiniteScroll from "react-infinite-scroll-component";

const Listing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pokemonData, nextPage, pokemonImages, filteredPokemons } =
    useSelector((state) => state.pokemon);

  const DataToBeRendered =
    filteredPokemons.length > 0 ? filteredPokemons : pokemonData;
  console.log(filteredPokemons);

  useEffect(() => {
    DataToBeRendered.forEach((pokemon) => {
      if (!pokemonImages[pokemon.id]) {
        dispatch(
          savePokemonImage({
            id: pokemon.id,
            image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
          })
        );
      }
    });
  }, [dispatch, pokemonData, pokemonImages]);

  const handleDetailsPage = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <section className="listing-main">
      <div className="listing">
        <h2>Pokemons List</h2>
        <div className="listing-section">
          <div className="listing-div">
            <InfiniteScroll
              dataLength={DataToBeRendered.length}
              next={() => dispatch(fetchPokemons(nextPage))}
              hasMore={!!nextPage}
              loader={<Loading />}
              endMessage={<p>No more Pokémon to load.</p>}
              className="listing-div"
            >
              {DataToBeRendered.map((pokemon, index) => {
                return (
                  <div key={pokemon.name + index} className="main-div">
                    <p className="pokemon-id">#{pokemon.id}</p>
                    <div
                      className="inside-div"
                      onClick={() => handleDetailsPage(pokemon)}
                    >
                      <div className="img">
                        <img
                          src={
                            pokemonImages[pokemon.id]
                              ? pokemonImages[pokemon.id]
                              : "placeholder_image_url"
                          }
                          alt=""
                        />
                      </div>
                      <div className="pokemon-info">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <h4>Name : </h4>
                          <span>
                            &nbsp;{capitalizeFirstLetter(pokemon.name)}
                          </span>
                        </div>
                      </div>
                      <div className="pokemon-info">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <h4>weight : </h4>
                          <span>&nbsp;{pokemon.weight / 10} (Kg)</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <h4>height : </h4>
                          <span>&nbsp;{pokemon.height / 10} (m)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
