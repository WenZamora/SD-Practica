"use client";
import {useState} from "react";

export default function PokemonItem({name_pokemon}) {
    const [clicks, setClicks] = useState(0); // estado para contar los clicks


    return (
        <li 
            onClick={ () => setClicks(clicks + 1) } // +1 el contador de clicks al hacer click :D
            style={{
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
                backgroundColor: clicks > 0  ?  "#0e2234ff" : "#34609eff", // cambia el color de fondo si se ha hecho clic
            }}
        > 
            <strong>{name_pokemon}</strong>
            <p> Usado {clicks} {clicks === 1 ? "vez" : "veces"}</p>
        </li>
    );
}