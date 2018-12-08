import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 7
      </h1>
      <strong>selected pokemon id: {selectedPokemonId}</strong>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense fallback={<div>...loading</div>}>
          <PokemonDetail
            url={`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}/`}
          />
          <PokemonList onSelect={(id) => setSelectedPokemonId(id)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
