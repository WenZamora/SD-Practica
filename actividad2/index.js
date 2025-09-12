const axios = require('axios');

//https://jsonplaceholder.typicode.com/users
//https://jsonplaceholder.typicode.com/posts?userId=ID


async function obtener3PrimerosUsuarios(){ //devuelve una promesa
    try{
        const respUsuarios = await axios.get('https://jsonplaceholder.typicode.com/users');
        const arrayUsuarios = respUsuarios.data.slice(0, 3); // respUsuarios.data --> todos / +.slice(0, 3) --> los primeros 3
        
        const usuariosIdyNombre = arrayUsuarios.map(usuario => ({ //
            id:usuario.id,
            nombre: usuario.name 
        }));

        return usuariosIdyNombre; //devuelvo un array con los usuarios (id y nombre)
    }
    catch(error){
        return []; //nada
    }
}


async function usuariosYCantPubliSecuencial(){ // devuelve una promesa

    console.log('****Secuencial****');

    const usuarios = await obtener3PrimerosUsuarios(); //await - espero a que termine

    for(const u of usuarios){ //pido las publicaciones de un usuario a la vez
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${u.id}`);
        //await - espera a que termine la peticion actual antes de pasar a la sig
   
        const cantPublicaciones = resp.data.length; //cantPublicaciones del usuario actual

        console.log(`El usuario ${u.nombre} tiene ${cantPublicaciones} publicaciones`);
        
    }

}

async function usuariosYcantPubliConcurrente(){
    console.log('***Concurrente***');

    const usuarios = await obtener3PrimerosUsuarios(); //await - espero a que termine

    //array de promesas
    const arrayPromesas = usuarios.map( u => //para cada uno
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${u.id}`)
    );

    //ahora espero a que terminen todas las promesas a la vez
    const resp = await Promise.all(arrayPromesas); //promise.all me devuelve una promesa que se resuelve cuando todas las promesas del array se resolvieron

    resp.forEach((resp, indice) => {
        
        const usuario = usuarios[indice];
        const cantPublicaciones = resp.data.length;

        console.log(`El usuario ${usuario.nombre} tiene ${cantPublicaciones} publicaciones`);
    });
    

}

async function main(){
    await usuariosYCantPubliSecuencial();

    await usuariosYcantPubliConcurrente();
}

main();