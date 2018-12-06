import React, { Suspense, useState } from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  return await res.json();
});

const PokemonDetailResource = createResource(async (url) => {
  const res = await fetch(url);
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

function PokemonList({ handleClick }) {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map((pokemon) => (
        <PokemonListItem
          onClick={() => handleClick(pokemon.url)}
          key={pokemon.url}
        >
          {pokemon.name}
        </PokemonListItem>
      ))}
    </ul>
  );
}

function PokemonDetail({ url }) {
  let pokemon;
  if (url) {
    pokemon = PokemonDetailResource.read(url);
  }
  return (
    <div style={{ border: '1px solid' }}>
      {pokemon && (
        <>
          Name: {pokemon.name}
          <br />
          Height: {pokemon.height}
          <br />
          Weight: {pokemon.weight}
        </>
      )}
    </div>
  );
}

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
        : Day 5
      </h1>
      <Suspense fallback={<div>...loading</div>}>
        <PokemonList handleClick={setSelected} />
        <br />
        <PokemonDetail url={selected} />
      </Suspense>
    </div>
  );
}

export default App;
