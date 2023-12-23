# Pokédex Web App
This is a Pokédex web application built using ReactJS, Redux Toolkit, and Axios. It allows users to search and browse Pokémon data fetched from the [PokeAPI](https://pokeapi.co/). .

## Live Link

[https://dex-poke-mon.vercel.app/](https://dex-poke-mon.vercel.app/)

## Features

- **Search Page :** Users can search for Pokémon by name. The app makes an API call to retrieve the Pokémon data and displays loading indicators and error messages as needed. 

- **Pokemon List Page with Infinite scrolling :** Displays a list of Pokémon fetched from the API. The page supports infinite scrolling, loading more Pokémon as the user scrolls.

- **Details Page :** I have made a separate page for displaying detailed information about a selected Pokémon, including its abilities, types, stats, and more.

- **Real-time Filter :** Allows users to filter pokemons based on their types without refreshing.


## Technologies Used

- ReactJS
- Redux Toolkit (for state management)
- Axios (for API calls)
- React Infinite Scroll Component (for infinite scrolling functionality)
- React Redux (for integrating Redux with React)
- React Router DOM (for routing within the app)
- React Tabs (for tab-based navigation)


## Getting Started

- Clone the repository to your local machine
- Navigate to the project directory
- Install the dependencies
- Start the development server
- Open the app in your browser: http://localhost:5173/


## API Integration

This app integrates with the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. The API base URL is https://pokeapi.co/api/v2. The following endpoints are used:

- **/pokemon :** Retrieves a list of all Pokémon. (by default 20 limit)
- **/pokemon/{name} :** Fetches detailed information about a specific Pokémon.
- **https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/id.svg :** For images of different pokemons with different id

