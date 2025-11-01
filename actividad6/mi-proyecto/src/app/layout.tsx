// Es un server component por defecto -> se renderiza en le servidor
// Envuelve a todas las páginas de app (lista principal y detalle de pokemon)
// Sirve para definir una estructura común (navbar, footer ..) para todas las páginas

import Link from "next/link"; 

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
            Pokedex - Lista Principal
          </Link>
        </nav>
        </header>
        
        {/* children prop  coloca el contenido d la pagg actual- que se este usando (lista ppal o la de un pokemon )*/}
        <main style={{
          padding: '20px', 
          minHeight: '80vh'
        }}>
          {children}
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