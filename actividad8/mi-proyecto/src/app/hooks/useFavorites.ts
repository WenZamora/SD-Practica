"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/services/favorites.service";

const FAVORITES_QUERY_KEY = ["favorites"]; // CLAVE UNICA para la lsita de favoritos

// primero un hook para poder obtener la lista de fav
export function useFavorites(){
    return useQuery({
        queryKey: FAVORITES_QUERY_KEY,
        queryFn: favoritesService.getAll,
        staleTime: 0, // asi la lista se act con frecuencia 
    });
}

//hook para agregar un fav
export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        /////mutationFn: favoritesService.add, // llamo a la func del service que hace el POST
        mutationFn: async (favoriteData: any) => {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(favoriteData),
            });
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.error || "Error al agregar favorito");
            }
            return response.json();
        },


        //Al ser exitoso se invalida lacach
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY}); //para que useFavorites se vuelva a ejecutar automat
        },
    });
}

//hook para eliminar un fav
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
        //mutationFn: favoritesService.remove, //Llamo a la funcion de service que hace DELETE
        
        mutationFn: async (id: string) => { 
            const response = await fetch(`/api/favorites/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Error al eliminar favorito");
            }
        },

        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
        },
    });
}
