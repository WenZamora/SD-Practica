// lo modifico para manejar la nav client - link

/* //////////no los necesito por ahira
"use client";
import {useState} from "react";
*/
import Link from "next/link"; 

//Recibo la prop "pokemon" que va a contener { name: string, url: string }
export default function PokemonItem({pokemon}) {
  //no lo requiero mas  
  //const [clicks, setClicks] = useState(0); // estado para contar los clicks
  
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
      //backgroundColor: clicks > 0  ?  "#0e2234ff" : "#34609eff", // cambia el color de fondo si se ha hecho clic
    }}> 
      {/* href define la URL destino /pokemon/nombre_pokemon*/}
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
    </li>
  );
}