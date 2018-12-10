import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import sleep from 'sleep-promise';

const PokemonDetailResource = createResource(async (id) => {
  await sleep(3000);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return res.json();
});

function PokemonDetail({ resourceId }) {
  let pokemon;
  if (resourceId) {
    pokemon = PokemonDetailResource.read(resourceId);
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

export default PokemonDetail;
