import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';

import PokemonListItem from './PokemonListItem';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  return await res.json();
});

function PokemonList({ onSelect }) {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map((pokemon) => (
        <PokemonListItem
          onClick={() => onSelect(pokemon.url.split('/')[6])}
          key={pokemon.url}
        >
          {pokemon.name}
        </PokemonListItem>
      ))}
    </ul>
  );
}

export default PokemonList;
