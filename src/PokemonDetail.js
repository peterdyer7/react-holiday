import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonDetailResource = createResource(async (url) => {
  const res = await fetch(url);
  return res.json();
});

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

export default PokemonDetail;
