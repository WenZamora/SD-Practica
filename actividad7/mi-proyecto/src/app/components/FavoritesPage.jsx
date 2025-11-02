"use client";

import { useFavorites } from "../hooks/useFavorites";
import PokemonItem from "./PokemonItem";
import Link from 'next/link';

export default function FavoritesPage() {
    //uso el hook de lectura
    const { data: favorites, isLoading, isError, error } = useFavorites();

    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Cargando Favoritos...</h2>
            </div>
        );
    }

    if (isError) {
        return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar favoritos: {error.message}</p>;
    }

    // Si la lista esta vacia
    if (!favorites || favorites.length === 0) {
        return (
            <div style={{ 
                padding: '50px', 
                textAlign: 'center', 
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '20px auto',
                maxWidth: '600px'
            }}>
                <h2>No tienes Pokémons favoritos aún.</h2>
                <p>Usa la lista principal para marcar tus preferidos.</p>
                <Link 
                    href="/" 
                    style={{ 
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#34609eff',
                        color: 'white',
                        textDecoration: 'none', 
                        fontWeight: 'bold',
                        borderRadius: '4px'
                    }}
                >
                    Ir a la Lista Principal
                </Link>
            </div>
        );
    }

    // Hay favs
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Tus Pokémons Favoritos ({favorites.length})</h2>
            <ul style={{ display: "flex", flexWrap: "wrap", padding: 0, justifyContent: "center" }}>
                {favorites.map((favorite) => (
                    // Reutilizamos el PokemonItem. 
                    // Lo importante es que pasamos 'isFavorite={true}' para que muestre el botón de "Quitar"
                    <PokemonItem 
                        key={favorite.id} 
                        // El formato de la API de favoritos solo nos da { id: "slug", name: "Nombre" }
                        pokemon={{ name: favorite.id }} 
                        isFavorite={true} // Siempre TRUE en esta vista
                    /> 
                ))}
            </ul>
        </div>
    );
}