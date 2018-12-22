import React, { Suspense, useState, useEffect } from 'react';

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
  const [selectedPokemonId, setSelectedPokemonId] = useState(4);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    document.addEventListener('resize', setWidth(window.innerWidth));
  });

  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 20
      </h1>
      <strong>window width: {width}</strong>
      <br />
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
