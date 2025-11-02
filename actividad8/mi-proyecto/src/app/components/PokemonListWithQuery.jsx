'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonItem from "./PokemonItem";
import { useFavorites } from "../hooks/useFavorites";// importo el hook que trae la lista de favoritos////ya no va mas
import { fetchPokemonList } from "../services/pokeapi"; // importo la funcion fetching de la carp services

const PAGE_SIZE = 30; // CONTS - nro de pokemons por página

export default function PokemonListWithQuery() {

    const [currentLimit, setCurrentLimit] = useState(PAGE_SIZE); // para el limite actual de pokemons a mostrar (de 30 por la const PAGE_SIZE) // cuando se clickea "carga mas" se actualiza este estado de 30 a 60 x ejem

    //para obtener la list ppal de pokemon
    const {
        data: pokemonListData, 
        isLoading: isListLoading, 
        isError: isListError, 
        error: listError
    } = useQuery ({
        queryKey: ['pokemonList', currentLimit], 
        queryFn: () => fetchPokemonList(currentLimit),
    })

    //para obtener lista de favs
    const { 
        data: favorites, 
        isLoading: isFavoritesLoading, // Estado de carga de los favoritos
        isError: isFavoritesError
    } = useFavorites();


    //Ahora rendet¿rizo //// voy a tener la carga de la lista de pokemons y la carga de lista favs --> unificado 
    const isLoading = isListLoading || isFavoritesLoading;

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
                            width: '200px', 
                            height: '100px', 
                            backgroundColor: '#e0e0e0', 
                            borderRadius: '8px', 
                            animation: "pulse 1.5s infinite alternate" 
                        }}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isListError) {
        return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los Pokémon: {error.message}</p>;
    }   

    //"Cargar MAa.. "
    const handleLoadMore = () => {
        // Incrementa el límite entonces automat activa un nuevo fetch en useQuery
        setCurrentLimit(prevLimit => prevLimit + PAGE_SIZE);
    };

    //Set <- para almacenar una coleccion de valores
    const favoriteSlugs = new Set(favorites?.map(f => f.id) || []);

    return (
        <div> 
            <h2>Listado de Pokemons</h2>

            {/*Si falla la carga d favs */}
            {isFavoritesError && <p style={{ color: 'orange', textAlign: 'center' }}>Advertencia: No se pudo cargar la lista de favoritos.</p>}

            <ul style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                padding: 0, 
                justifyContent: "center",
            }}>
                {pokemonListData?.map((pokemon) => (
                    // Paso el prop isFavorite a PokemonItem
                    <PokemonItem 
                        key={pokemon.name} 
                        pokemon={pokemon}
                        // comprueba si el nombre del Pokémon está en el Set de IDs favoritos
                        isFavorite={favoriteSlugs.has(pokemon.name)}
                    /> 
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
