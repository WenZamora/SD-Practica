// post y get actuan soble coleccion completa de recurss por lo que van en la ruta ppal (a dif de delete que se asocia a un recurso especifico)
//para crear el favorito y obtener la lista completa

import { NextResponse } from "next/server"; 
import { db } from "@/app/lib/database"; //importi la instancia de la BD

interface FavoriteBody { //defino el tipo de dato que espero en body
    id: string;
    name: string;
}

//Ahora la funcion que maneha la peticion POST
export async function POST(request: Request) {
    try {
        const body: FavoriteBody = await request.json(); 
        
        //valido datos!!!
        if (!body.id || !body.name) { 
            return NextResponse.json(
                { error: "Faltan datos obligatorios." }, 
                { status: 400 }); // 400 : peticion incorrecta   
        }

        //ahora creo el fav en la BD
        const newFavorite = await db.create(body); //uso la instancia de la BD y su metodo create

        return NextResponse.json(newFavorite, { status: 201 }); //201: se creo exitosamente
    } catch (error: any) {
        //Tengo que manejar los error 

        //si BD lanza errir de duplicado 
        if(error.message.includes("ya existe en favoritos")) {
            return NextResponse.json(
                { error: "Ya esta en la lista de fav" },
                { status: 409 } //409: conflicto -> el recurso que se intenta crear ya existe
            );
        }

        //otro error
        console.error("Error al crear favorito:", error);
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 } //500: error interno del servidor
        );
    }
}

//Agrego un GET para obtener TODA la lista de fav
export async function GET() {
    try {
        const favorites = await db.getAll();
        return NextResponse.json(favorites, { status: 200 }); // 200: exito
    } catch (error) {
        return NextResponse.json(
            { error: "Error al obtener favoritos" },
            { status: 500 } // 500: error interno del serv
        );
    }
}
