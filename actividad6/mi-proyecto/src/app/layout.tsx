import Link from "next/link"; 

// ahora el layout tiene que envolver el contendico con el providers.tsx, 
import { Providers } from "./providers";

//Va a recibir "children" que es lo que se va a renderizar dentro del layout
export default function RootLayout ({children}: {children: React.ReactNode}) { // children es de tipo React.ReactNode - 
  return (
    <html lang="es">
      <body>  
        {/* Navbar con un Link a la lista principal */}
        <header style = {{ 
          padding: '20px', 
          backgroundColor: '#34609eff', 
          color: 'white',
        }}>
        
        <nav>
          {/*navegacion cliente -> solo se actualiza la parte de la pag que cambia*/}
          <Link href="/" style={{
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            fontSize: '1.2em'
          }}>
            Pokedex
          </Link>
        </nav>
        </header>
        
        {/* children prop  coloca el contenido d la pagg actual- que se este usando (lista ppal o la de un pokemon )*/}
        <main style={{
          padding: '20px', 
          minHeight: '80vh'
        }}>
          {/* !!!!!!!!!!!Envuelvo el contenido con el providers!!!!!!!!!!*/}
          {/*Ahora cualque componnte (app/page.tsx o ls hijos)dentro del main puede usar useQuery  */}
          <Providers>
            {children}
          </Providers>
        </main>

        {/* Footer con texto de relleno */}
        <footer style={{ 
          padding: '10px', 
          textAlign: 'center', 
          backgroundColor: '#f0f0f0', 
          borderTop: '1px solid #ddd',
        }}>
          <p>© 2025 Pokedex. Todos los derechos reservados. (? </p>
        </footer>

      </body>
    </html>
  )
}