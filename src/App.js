import React, { Suspense, useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

function PokemonItem({ name, url, className, ...props }) {
  return (
    <h1 {...props} className={['pokemon-item', className].join(' ')}>
      {name}, {url}
    </h1>
  );
}

const pokemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
};

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 8
      </h1>
      <PokemonItem id="some-id" className="app-pokemon" {...pokemon}>
        The Pokemon
      </PokemonItem>
      {/* <strong>selected pokemon id: {selectedPokemonId}</strong>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense fallback={<div>...loading</div>}>
          <PokemonDetail
            url={`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}/`}
          />
          <PokemonList onSelect={(id) => setSelectedPokemonId(id)} />
        </Suspense>
      </ErrorBoundary> */}
    </div>
  );
}

export default App;
