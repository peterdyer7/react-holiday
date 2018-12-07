import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

function App() {
  const [selected, setSelected] = useState(
    'https://pokeapi.co/api/v2/pokemon/1/'
  );
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 6
      </h1>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense fallback={<div>...loading</div>}>
          <PokemonList handleClick={setSelected} />
          <br />
          <PokemonDetail url={selected} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
