import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  return await res.json();
});

function PokemonList({ renderItem }) {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map((pokemon) =>
        renderItem({ id: pokemon.url.split('/')[6], ...pokemon })
      )}
    </ul>
  );
}

export default PokemonList;
