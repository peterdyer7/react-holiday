import React, { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  return res.json();
});

function PokemonListItem({ className, component: Component = 'li', ...props }) {
  return (
    <Component
      className={['pokemon-list-item', className].join(' ')}
      {...props}
    />
  );
}

function PokemonList() {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map((item) => (
        <PokemonListItem key={item.name}>{item.name}</PokemonListItem>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Two">
          ⚛️🎄✌️
        </span>
        : Day 4
      </h1>
      <Suspense fallback={<div>...loading</div>}>
        <PokemonList />
      </Suspense>
    </div>
  );
}

export default App;
