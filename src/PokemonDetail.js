import { unstable_createResource as createResource } from 'react-cache';
import sleep from 'sleep-promise';

const PokemonDetailResource = createResource(async (id) => {
  await sleep(0);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return res.json();
});

function PokemonDetail({ pokemonId: id, render }) {
  return render(PokemonDetailResource.read(id));
}

export default PokemonDetail;
