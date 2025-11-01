// Esta es una ruta dinamica para mostrar el detalle de un pokemon
//el parametro de la ruta es name_pokemon -> [name_pokemon] se extrae de la URL 
// y lo uso para hacer una llamda nueva a la api y asi obtener los datos especificos del pokemon 

import axios from "axios";
import Link from "next/link";

//Defino que estructura van a tener los props que va a recibr este componente
interface PokemonDetailProps {
    params: { // objero con los parametros de la ruta
        name_pokemon: string; // parametro name_pokemon de tipo string !!!!! tiene que coincidir con el nombre de la carpeta [name_pokemon]
    };
}

export default async function PokemonDetail({params}: PokemonDetailProps) { 
    // extraigo el nombre del pokemon de los parametros de la ruta
    const {name_pokemon} = await params;
    const pokemonName = name_pokemon; 

    // hago la llamada a la api para obtener los datos del pokemon especifico
    const pokeApiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`; // se construye la url especifica

    let pokemonData: any = null; // variable para almacenar los datos del pokemon

    try {
        const respuesta = await axios.get(pokeApiURL); // hago la llamada a la api
        pokemonData = respuesta.data; // obtengo los datos del pokemon
    } catch (error) {
        console.error(`Error al obtener el detalle del Pokémon ${pokemonName}:`, error);
    }
    
    ///renderizo lod datos 
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px' 
        }}>
      
            <h1>Detalle de: {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h1>
      
            {/* para ver l imagen (Sprite) */}
            <img 
                src={pokemonData.sprites.front_default} 
                alt={`Imagen de ${pokemonData.name}`} 
                style={{ width: '150px', height: '150px' }}
            />
            
            <div style={{ 
                margin: '20px 0', 
                border: '1px solid #ccc', 
                padding: '15px', 
                borderRadius: '8px', 
                display: 'inline-block',
            }}>
                <h3>Propiedades</h3>
                <p><strong>ID:</strong> {pokemonData.id}</p>
                <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
                <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
                <p>
                <strong>Tipos:</strong> 
                {pokemonData.types.map((typeInfo: any) => (
                    <span key={typeInfo.slot} 
                        style={{ 
                            marginLeft: '8px', 
                            padding: '4px 8px', 
                            backgroundColor: '#88b4dbff', 
                            borderRadius: '4px', 
                            color: 'white',
                        }}>
                    {typeInfo.type.name}
                    </span>
                ))}
                </p>
            </div>

            {/*link paea volver */}
            <div style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ 
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#0e2234ff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>

                    &lt; Volver al Listado
                </Link>
                
            </div>
        </div>
    );
}