import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (nextPage, { dispatch }) => {
    const response = await axios.get(nextPage);
    const { results, next } = response.data;
    dispatch(updateNextPage(next));
    await dispatch(fetchSinglePokemon(results));

    return results;
  }
);

export const fetchSinglePokemon = createAsyncThunk(
  "pokemon/fetchSinglePokemon",
  async (results, { dispatch }) => {
    dispatch(updateLoading(true));
    const pokemonPromises = results.map(async (element) => {
      const response = await axios.get(element.url);
      return response.data;
    });
    const allPokemon = await Promise.all(pokemonPromises);
    allPokemon.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(updateLoading(false));
    return allPokemon;
  }
);

export const fetchSinglePokemonDetail = createAsyncThunk(
  "pokemon/fetchSinglePokemonDetail",
  async (name, { dispatch }) => {
    dispatch(updateLoading(true));
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      dispatch(updateLoading(false));
      return response.data;
    } catch (error) {
      dispatch(updateLoading(false));
      return [];
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonList: [],
    pokemonData: [],
    pokemonImages: {},
    pokemon: [],
    selectedType: "",
    filteredPokemons: [],
    nextPage: null,
    activeRoute: "/",
    loading: false,
  },
  reducers: {
    updateActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
    updateNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    removePokemon: (state) => {
      state.pokemon = [];
    },
    savePokemonImage: (state, action) => {
      const { id, image } = action.payload;
      state.pokemonImages[id] = image;
    },
    updateSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    updateFilteredPokemons: (state, action) => {
      state.filteredPokemons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemonList.push(...action.payload);
      })
      .addCase(fetchSinglePokemon.fulfilled, (state, action) => {
        state.pokemonData.push(...action.payload);
      })
      .addCase(fetchSinglePokemonDetail.fulfilled, (state, action) => {
        state.pokemon = action.payload;
      });
  },
});

export const {
  updateActiveRoute,
  updateNextPage,
  updateLoading,
  removePokemon,
  savePokemonImage,
  updateSelectedType,
  updateFilteredPokemons,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
