//pagina ppal -> server component por defecto

import axios from "axios";
//import PokemonList from "./components/PokemonList";  // este no lo uso ahora uso
import PokemonListWithQuery from "./components/PokemonListWithQuery";

//url de la api de pokemon
const Pokeapi_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';

//async porque voy a hacer una llamada a una api externa - para poder usar await
// uso async / await en el server componet para que el servidor pueda obtener todos los datos de la api antes de enviar el HTML al navegador
// entonces el usuario va a recibir la pag ya renderizada con los datos completos
export default async function Home() {
  let pokemonList = [];

  try {
    console.log("Inicia carga de datos de Pokemon");
    //No renderiza hasta que la API responda
    const response = await axios.get(Pokeapi_URL); // obtengo los datos de la api
    
    //sige una vez que la resp de la api llego
    pokemonList = response.data.results; // array con los pokemons

  } catch (error){
    console.error("Error al obtener la lista de pokemons:", error);
  }

  return ( // renderizo los datos
    <main> 
      <h1>Pokedex</h1>
        {/*<PokemonList pokemons={pokemonList} /> ////// Paso la lista ya cargada al componenre de PokemonList*/}
        <PokemonListWithQuery /> {/* Ahora uso el componente con useQuery para obtener los datos */}
    </main>
  );
}