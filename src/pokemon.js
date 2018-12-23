import React, { Suspense } from 'react';
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

const ImageResource = createResource(
  (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    })
);

function Img({ src, alt, ...rest }) {
  return <img src={ImageResource.read(src)} alt={alt} {...rest} />;
}

export function PokemonDetailItem({ pokemon }) {
  function TypeItem({ style, ...props }) {
    return (
      <li
        style={{
          backgroundColor: 'grey',
          display: 'inline-flex',
          marginRight: '.25em',
          borderRadius: '.25em',
          padding: '.5em 1em',
          color: 'white',
          ...style
        }}
        {...props}
      />
    );
  }

  function GrassTypeItem(props) {
    return <TypeItem style={{ backgroundColor: 'green' }} {...props} />;
  }

  function PoisonTypeItem(props) {
    return <TypeItem style={{ backgroundColor: 'purple' }} {...props} />;
  }

  return (
    <article>
      <section>
        <Suspense maxDuration={500} fallback="image loading...">
          <Img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </Suspense>
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
                <li key={ability.name}>{ability.name}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </section>
      <section>
        <h2>Types</h2>
        <ul>
          {pokemon.types.map(({ type }) => {
            switch (type.name) {
              case 'grass':
                return (
                  <GrassTypeItem key={type.name}>{type.name}</GrassTypeItem>
                );
              case 'poison':
                return (
                  <PoisonTypeItem key={type.name}>{type.name}</PoisonTypeItem>
                );
              default:
                return <TypeItem key={type.name}>{type.name}</TypeItem>;
            }
          })}
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
              {pokemon.stats.map(({ base_stat, stat }) => (
                <td
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    textAlign: 'center'
                  }}
                  key={stat.name}
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
                  key={stat.name}
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
