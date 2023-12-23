import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Details, Home } from "./pages";
import { fetchPokemons } from "./store/pokemon";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemons("https://pokeapi.co/api/v2/pokemon"));
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pokemon/:name" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
