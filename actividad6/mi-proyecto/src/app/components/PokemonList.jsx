//Lo modifico porque ahora la carga la hago en la ppal 
//-> recibe la lista de pokemons como props


"use client"; // para que ejecute del lado del clinete
//import { useEffect, useState } from "react"; // ya no lo necesito 
//import axios from "axios";
import PokemonItem from "./PokemonItem";
import Link  from "next/link"; 

//Ahora recibo un prop con la lista de pokemons
export default function PokemonList( { pokemons } ) {
    /* //// no lo necesitoporque la carga es en ppal
    const [ContPokemons, setPokemons] = useState([]);

    useEffect(() => { //trae los datos de la API cuando se ejecuta el componnete
        //accion a ejecutar
        async function fetchPokemons() { // Defino func asinc porque useEffect no puede ser asinc directamenete
            try {
                const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20"); // espero la respuesta de la API
                setPokemons(respuesta.data.results); // actualizo el estado con los pokemons
            } 
            catch (error) {
                console.error("Error al traer los pokemons", error);
            }
        }

        fetchPokemons(); // llamo a la funcion para que se ejecute
        */
  
        /*return() => {
            //Cleanup opcional
        };*/
/*
    }, []); // [dependencia]--> el array vacio es para que se ejecute una sola vez al montar el componente

    return (
        <div> 
            <h2>Listado de Pokemons</h2>
    /////////////////////no necesito mas el cargando ..... 
            {ContPokemons.length === 0 ? ( // muestra "cargando.." si no hay pokemons
                <p>Cargando...</p>
            ) : ( // si hay, los muestro en una lista
                <ul
                     style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: 0,
                    justifyContent: "center",
                    }}
                >
                    {ContPokemons.map((pokemon) => ( // recorro el array de pokemons
                        //<li key={pokemon.name}> {pokemon.name} </li> // key es para que react identifique cada elemento - muestro el nombre
                        <PokemonItem key={pokemon.name} name_pokemon={pokemon.name} /> // uso el componente PokemonItem para mostrar cada pokemon
                    
                    ))}
                </ul>
            )}
        </div>
    );*/

    if (!pokemons || pokemons.length === 0) { // !pokemons --> si es undefined o null // pokemons.length === 0 --> si es un array vacio
        return <p>No se recibieron pokemons.</p>;
    }

    return(
        <div> 
            <h2>Listado de Pokemons</h2>
            <ul style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                padding: 0, 
                justifyContent: "center",
            }}>
                {pokemons.map((pokemon) => ( // recorro el array de pokemons
                    // Paso el objeto pokemon al item.
                    <PokemonItem key={pokemon.name} pokemon={pokemon} /> // uso el componente PokemonItem para mostrar cada pokemon
                ))}
            </ul>
        </div>
    );
}