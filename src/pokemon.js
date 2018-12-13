import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import sleep from 'sleep-promise';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  return await res.json();
});

export function PokemonList({ renderItem }) {
  return PokemonCollectionResource.read().results.map((pokemon) =>
    renderItem({ id: pokemon.url.split('/')[6], ...pokemon })
  );
}

const PokemonDetailResource = createResource(async (id) => {
  await sleep(0);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return res.json();
});

export function PokemonDetail({ pokemonId: id, render }) {
  return render(PokemonDetailResource.read(id));
}

export function PokemonListItem({
  className,
  component: Component = 'li',
  ...props
}) {
  return (
    <Component
      className={['pokemon-list-item', className].join(' ')}
      {...props}
    />
  );
}

export function PokemonDetailItem({ pokemon }) {
  return (
    <article style={{ border: '1px solid' }}>
      <strong>selected pokemon id: {pokemon.id}</strong>
      <br />
      Name: {pokemon.name}
      <br />
      Height: {pokemon.height}
      <br />
      Weight: {pokemon.weight}
    </article>
  );
}

export function PokemonError() {
  return <div>Oops!</div>;
}

export function PokemonListLoading() {
  return <div>...loading list</div>;
}

export function PokemonDetailLoading() {
  return <div>...loading detail</div>;
}
