interface FavoriteData { 
    id:string;
    name: string;
}

export const favoritesService ={
    
    //Función para obtener la lista (llama a GET /api/favorites)
    getAll: async (): Promise<FavoriteData[]> => {
    const res = await fetch("/api/favorites");
    
    if (!res.ok) {
        throw new Error("Error al obtener la lista de favoritos.");
    }
    
    return res.json();
  },
    

    //Funcion para agregar un fav (llama a POST/api/favorites)
    add: async (favorite: FavoriteData): Promise<FavoriteData> => {
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite),
        });
        
        if (!res.ok){
            const errorData = await res.json(); // lee el error del msj de la api route
            throw new Error(errorData.error || "Error al agregar a fav"); //se lanxa error pata que lo captur eTanStacjk..
        }
        return res.json(); //si resp es 201 
    },

    // funcion para eliminar un fav (llama a DELETE /api/favorites/[id])
    remove: async (id: string): Promise<void> => {
        const res = await fetch(`/api/favorites/${id}`, {
            method: "DELETE",
        });

        if(!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error al quitar de favoritos.");
        }

        //como es void -> si la resp es 200 exitos - la promesa se resuelve y no devuelve nada !!!!!!
    }
  
}