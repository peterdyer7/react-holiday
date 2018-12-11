import React from 'react';

const PokemonDetailItem = ({ pokemon }) => (
  <div style={{ border: '1px solid' }}>
    <strong>selected pokemon id: {pokemon.id}</strong>
    <br />
    Name: {pokemon.name}
    <br />
    Height: {pokemon.height}
    <br />
    Weight: {pokemon.weight}
  </div>
);

export default PokemonDetailItem;
