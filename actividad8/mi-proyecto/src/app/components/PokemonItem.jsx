
"use client"; //vuelve a ser componente cliente

import Link from "next/link"; 
//import los hooks de mutacion 
import { useAddFavorite, useRemoveFavorite } from "../hooks/useFavorites";

//Recibo la prop "pokemon" que va a contener { name: string, url: string }
export default function PokemonItem({pokemon, isFavorite}) {
  //llamada a los hooks
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  //las var de estado y de error
  const isLoading = addMutation.isPending || removeMutation.isPending;
  const hasError = addMutation.isError || removeMutation.isError;
  const errorMessage = addMutation.error?.message || removeMutation.error?.message;

  //func para agregar o sacar de fav
  const handleToggleFavorite = () => { // mira el prop isFavorite y analizo si es t o f
    const favoriteData = {
        id: pokemon.name, // El slug ej: "pikachu")
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // El nombre con mayúscula inicial
    };

    if (isFavorite) {// Si es fav -> llama a la mutación de eliminación, pasando solo el ID
        removeMutation.mutate(pokemon.name);
    } else { // Si NO es fav ->llama a la mutación de agregar, pasando el objeto de datos
        addMutation.mutate(favoriteData);
    }
  };



  const pokemon_name = pokemon.name.toLowerCase(); // obtengo el nombre en minusculas para usar en la url

  return (
    <li style={{
      border: "1px solid #88b4dbff",
      borderRadius: "8px",
      margin: "10px",
      padding: "10px",
      width: "200px",
      listStyle: "none",
      textAlign: "center",
      textTransform: "capitalize",
      cursor: "pointer", // cambia el puntero del mouse  :O
      userSelect: "none", // evita seleccionar el texto al hacer clic
    }}> 
      <Link href={`/pokemon/${pokemon_name}`} 
        style={{
          border: "1px solid #88b4dbff",
          borderRadius: "8px",
          padding: "20px",
          width: "200px",
          textAlign: "center",
          textDecoration: "none", // Quita el subrayado del enlace por defecto
          display: "block",
          backgroundColor: "#34609eff", 
          color: "white",
          textTransform: "capitalize",
          cursor: "pointer",
      }}> 
        <h4>{pokemon.name}</h4>
        <p>Ver Detalle</p>
      </Link>

      {/* El boton!!!!! */}
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading} // Deshabilitar si se está procesando (estado de carga)
        style={{ 
            marginTop: '10px',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            // La apariencia cambia si isFavorite es true!!!!!!!!!!
            backgroundColor: isFavorite ? 'gold' : '#f0f0f0',
            color: isFavorite ? 'black' : '#333',
            fontWeight: 'bold',
    }}>
      {/* PARA MOSTRAR EL ESTADO DE CARGA */}
      {isLoading ? (
        "Procesando..." // muestar que esta cargadno
      ): isFavorite ? (
        "Quitar de favoritos" // es fav
      ): (
        "Agregar a favoritos" // no es fav
      )}

    </button>

    {/* para ver el Error */}
    {hasError && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errorMessage}</p>}

    </li>
  );
}