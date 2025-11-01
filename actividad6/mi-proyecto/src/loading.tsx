//se renderiza en el servidor mientras el server componet esta eserando la resp de la api

import React from "react";

export default function Loading() {
    const skeletonCards = Array.from({ length: 15 });

    return (
        <div style={{ 
            textAlign: "center", 
            padding: "20px" 
        }}>
            <h2>Cargando Pokémons...</h2>
            <div style={{
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "center", 
                gap: "20px" 
            }}>
                {skeletonCards.map((_, index) => ( 
                    <div key={index} 
                        style={{ 
                        width: "200px", 
                        height: "100px", 
                        backgroundColor: "#eee", 
                        borderRadius: "8px", 
                        animation: "pulse 1.5s infinite alternate", // Efecto visual de carga
                    }}>
                        {/* Contenido vacío del esqueleto */}
                    </div>
                )) }
            </div>
        </div>
    );
}