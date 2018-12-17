import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
// import sleep from 'sleep-promise';

const PokemonCollectionResource = createResource(async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const result = await res.json();
  return {
    ...result,
    results: result.results.map((pokemon) => ({
      id: pokemon.url.split('/')[6],
      ...pokemon
    }))
  };
});

export function PokemonList({ renderItem }) {
  return PokemonCollectionResource.read().results.map(renderItem);
}

const PokemonDetailResource = createResource(async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  // await sleep(500);
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
      <section>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </section>
      <section>
        <h1>{pokemon.name}</h1>
      </section>
      <section>
        <dl>
          <dt>Height:</dt>
          <dd>{pokemon.height}</dd>
          <dt>Weight:</dt>
          <dd>{pokemon.weight}</dd>
          <dt>Abilities:</dt>
          <dd>
            <ul>
              {pokemon.abilities.map(({ ability }) => (
                <li>{ability.name}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </section>
      <section>
        <h2>Types</h2>
        <ul>
          {pokemon.types.map(({ type }) => (
            <li>{type.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Stats</h2>
        <table
          style={{
            borderCollapse: 'collapse'
          }}
        >
          <tbody>
            <tr>
              {pokemon.stats.map(({ base_stat }) => (
                <td
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    textAlign: 'center'
                  }}
                >
                  {base_stat}
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              {pokemon.stats.map(({ stat }) => (
                <th
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    textAlign: 'center'
                  }}
                >
                  {stat.name}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </section>
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
