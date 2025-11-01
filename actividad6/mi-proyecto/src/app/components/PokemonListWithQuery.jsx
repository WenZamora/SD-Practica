//pra implementar Client-side Fetching con TanStack Query
//es un componente cliente --> desde aca manejo el estado de la app (el tamaño del limite de pokemosn a cargar)
// comunicacion con la api con useQuery
// renderizar -> skeleton, error, lista de pokemons o boton "cargar mas"
'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonItem from "./PokemonItem";
import { fetchPokemonList } from "../services/pokeapi"; // importo la funcion fetching de la carp services

const PAGE_SIZE = 30; // CONTS - nro de pokemons por página

export default function PokemonListWithQuery() {

    const [currentLimit, setCurrentLimit] = useState(PAGE_SIZE); // para el limite actual de pokemons a mostrar (de 30 por la const PAGE_SIZE) // cuando se clickea "carga mas" se actualiza este estado de 30 a 60 x ejem

    const { data, isLoading, isError, error } = useQuery({  //data, isLoading, isError : estados reactivos q devuelve el hook -> TanStack Query los actualiza automat

        // queryKey: clave unica para esta query --> identificar cada solic, entonces el TanStack Query sabe que es una solic diferente,
        //  ejecuta de nuevo queryFn para traer datos nuevos 
        queryKey: ['pokemonList', currentLimit], 

        queryFn: () => fetchPokemonList(currentLimit), // funcion fetching - le paso el limite actual --> me trae los datos
    });

    //Ahora rendet¿rizo
    if (isLoading) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
            }}>
                <h2>Cargando Pokémons ( TanStack Query...)</h2>
                <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "center", 
                    gap: "15px", 
                    marginTop: "20px" 
                }}>
                    {/* Skeleton simple para simular la carga */}
                    {Array.from({ length: currentLimit }).map((_, index) => (
                        <div key={index} style={{ 
                            width: '200px', height: '100px', backgroundColor: '#e0e0e0', borderRadius: '8px', 
                            animation: "pulse 1.5s infinite alternate" 
                        }}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los Pokémon: {error.message}</p>;
    }

    //"Cargar MAa.. "
    const handleLoadMore = () => {
        // Incrementa el límite entonces automat activa un nuevo fetch en useQuery
        setCurrentLimit(prevLimit => prevLimit + PAGE_SIZE);
    };

    return (
        <div> 
            <h2>Listado de Pokemons (Client-side Fetching)</h2>
            <ul style={{ display: "flex", flexWrap: "wrap", padding: 0, justifyContent: "center" }}>
                {data?.map((pokemon) => (
                    // Usamos el componente de la Actividad 5 para la navegación
                    <PokemonItem key={pokemon.name} pokemon={pokemon} /> 
                ))}
            </ul>

            {/* Componente de paginación con "cargar más" */}
            <div style={{ 
                marginTop: '30px', 
                textAlign: 'center' 
            }}>
                <button onClick={handleLoadMore} style={{ 
                    padding: '10px 20px', 
                    fontSize: '1em', 
                    backgroundColor: '#34609eff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                }}>
                    Cargar más Pokémons (Mostrando {currentLimit})
                </button>
            </div>
        </div>
    );

}
