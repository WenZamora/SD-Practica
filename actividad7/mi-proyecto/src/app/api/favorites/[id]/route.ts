//Aca el DELETE - se asoca a un recurso especifico por eso va en ruta con id
import { NextResponse } from "next/server";
import { db } from "@/app/lib/database"; //importi la instancia de la BD

// func DELEte va a recibir el obj ''params que coincide con el ID de la ruta diamica 
export async function DELETE( request: Request, { params }: { params: { id: string } } ) {

    try {
        //const id = params.id; // id es nombre/slug del pokemon
        const { id } = await Promise.resolve(params);
        
        //VAlido el param
        if(!id){
            return NextResponse.json(
                { error: "ID de Pokémon es obligatorio." },
                { status: 400 } //400: peticion incorrecta
            );
        }
        
        const deleted =  await db.delete(id); //uso la instancia de la BD y su metodo delete
        
        //cuando no se encuentra
        if(!deleted){
            return NextResponse.json(
                { error: "Pokémon no encontrado en favoritos." },
                { status: 404 } // 404 Not Found
            );
        }

        //Resp exito
        return NextResponse.json(
            { message: `Pokémon ${id} eliminado correctamente de favoritos.` },
            { status: 200 } // 200 exito
        );

    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 } //500: error interno del servidor
        );
    }
}