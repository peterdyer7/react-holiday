import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import PokemonListItem from './PokemonListItem';
import PokemonDetailItem from './PokemonDetailItem';

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 11
      </h1>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense maxDuration={0} fallback={<div>...loading detail</div>}>
          <PokemonDetail
            pokemonId={selectedPokemonId}
            render={(pokemon) => <PokemonDetailItem pokemon={pokemon} />}
          />
        </Suspense>
        <Suspense maxDuration={300} fallback={<div>...loading list</div>}>
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
