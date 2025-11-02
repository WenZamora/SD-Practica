import { NextResponse } from "next/server"; 
import { db } from "@/app/lib/database"; //importi la instancia de la BD

interface FavoriteBody { //defino el tipo de dato que espero en body
    id: string;
    name: string;
}

//Ahora la funcion que maneha la peticion POST
export async function POST(request: Request) {
    try {
        const {
            id,
            name,
            customName,
            description
        } = await request.json();


        //valido datos!!!
        if (!id || !name) { 
            return NextResponse.json(
                { error: "Faltan datos id y name" }, 
                { status: 400 }); // 400 : peticion incorrecta   
        }

        //ahora creo el fav en la BD
        const newFavorite = await db.create({
            id,
            name,
            customName: customName || name, // Si no viene customName, usa el nombre original
            description: description || "Sin descripción", // Asignar un valor por defecto si no viene
        }); //uso la instancia de la BD y su metodo create

        return NextResponse.json(newFavorite, { status: 201 }); //201: se creo exitosamente
    
    } catch (error: any) {
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
