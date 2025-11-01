//funcion encargda de la llamada de la api

interface PokemonResult {
    name: string;
    url: string;
}

// funcion asincrona tiene por parametros de entrada limit, offset
// me devuelve la promesa de una liista de pokemons
export async function fetchPokemonList( limit: number, offset: number =0): Promise<PokemonResult[]> { 
    // construyo la url con los parametros limit y offset
    const POKEAPI_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`; 

    // con fetch nativo
    const res = await fetch(POKEAPI_URL); 

    if (!res.ok) { // si la respuesta no es ok, lanzo un error
        throw new Error('Error al obtener la lista de Pokémon');
    }

    const data = await res.json(); // obtengo los datos en formato json
    return data.results; // devuelvo solo el array de resultados o sea de pokemons
}