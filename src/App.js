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
  const [selectedPokemonId, setSelectedPokemonId] = useState(0);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 19
      </h1>
      <ErrorBoundary fallback={PokemonError}>
        {selectedPokemonId > 0 ? (
          <Suspense maxDuration={1000} fallback={<PokemonDetailLoading />}>
            <button type="button" onClick={() => setSelectedPokemonId(0)}>
              {`< `}Back
            </button>
            <PokemonDetail
              pokemonId={selectedPokemonId}
              render={(pokemon) => <PokemonDetailItem pokemon={pokemon} />}
            />
          </Suspense>
        ) : (
          <Suspense maxDuration={2000} fallback={<PokemonListLoading />}>
            <ul>
              <PokemonList
                renderItem={(pokemon) => (
                  <PokemonListItem
                    key={pokemon.id}
                    onClick={() => setSelectedPokemonId(pokemon.id)}
                  >
                    {pokemon.name}
                  </PokemonListItem>
                )}
              />
            </ul>
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
