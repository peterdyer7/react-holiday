import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import PokemonListItem from './PokemonListItem';

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 10
      </h1>
      <strong>selected pokemon id: {selectedPokemonId}</strong>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense maxDuration={0} fallback={<div>...loading detail</div>}>
          <PokemonDetail resourceId={selectedPokemonId} />
        </Suspense>
        <Suspense maxDuration={300} fallback={<div>...loading list</div>}>
          <PokemonList
            renderItem={(pokemon) => (
              <PokemonListItem
                onClick={() => setSelectedPokemonId(pokemon.id)}
                key={pokemon.id}
              >
                {pokemon.name}
              </PokemonListItem>
            )}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
