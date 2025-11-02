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
        mutationFn: favoritesService.add, // llamo a la func del service que hace el POST
        
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
        mutationFn: favoritesService.remove, //Llamo a la funcion de service que hace DELETE
        
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
        },
    });
}
