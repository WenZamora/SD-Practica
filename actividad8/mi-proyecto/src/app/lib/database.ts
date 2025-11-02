import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

//defino interfaz para el pokemon
//por ahora solo nombre e id (slug) para identificarlo
export interface FavoritePokemon {
  id: string;
  name: string;
  customName: string; 
  description: string;
  createdAt: Date;
}

class Database {
    //leer archi JSON y lo parsea
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, devolver array vacío
      return [];
    }
  }

  //escribe en el archivo JSON
  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  //!!!!!!operaciones CRUD las que va a usar la API Route !!!!!!
  
  //obtener todos 
  async getAll(): Promise<FavoritePokemon[]> {
    return await this.readDB();
  }

  //buscar uno por su id 
  async getById(id: string): Promise<FavoritePokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  // crea uno nuevo
  async create(favorite: Omit<FavoritePokemon, "createdAt">): Promise<FavoritePokemon> {
    const data = await this.readDB(); //leo datos act

    const existing = data.find(item => item.id === favorite.id); // existe el pokemon con ese id?
    
    if (existing) {
        throw new Error("El Pokémon ya existe en favoritos."); // si existe lanza eror para que lo capture la apii route
    }

    const newFavorite: FavoritePokemon = { //crea el nuevo obj 
      ...favorite,
      createdAt: new Date(),
    };

    data.push(newFavorite); //guarda
    await this.writeDB(data); //escribe
    return newFavorite;
  }

  //eliminar un favorito por id  
  async delete(id: string): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;

    const filtered = data.filter((item) => item.id !== id); // filtra el array para dejar solo los que nO coinciden con el id
    
    if (filtered.length === initialLength) {
      return false; // No se encontró el elemento
    }
    
    await this.writeDB(filtered); //escribe el array filtrado
    return true;
  }

  
}

export const db = new Database(); // exporta una unica instancia de la BD