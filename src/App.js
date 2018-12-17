import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';

import {
  PokemonList,
  PokemonDetail,
  PokemonListItem,
  PokemonDetailItem,
  PokemonError,
  PokemonListLoading,
  PokemonDetailLoading
} from './pokemon';

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 16
      </h1>
      <ErrorBoundary fallback={PokemonError}>
        <Suspense maxDuration={10000} fallback={<PokemonDetailLoading />}>
          <PokemonDetail
            pokemonId={selectedPokemonId}
            render={(pokemon) => <PokemonDetailItem pokemon={pokemon} />}
          />
        </Suspense>
        <Suspense maxDuration={2000} fallback={<PokemonListLoading />}>
          <ul>
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
          </ul>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
