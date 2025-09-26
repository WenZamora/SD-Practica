import CuadroColor from "./cuadroColor";
import Boton from "./boton";
import MezclaColores from "./mezclaColores";

export default function Home() {
  return (
    <main>
      <h1 style= {{
        textAlign: "center",
        fontFamily: "Cooper Black, sans-serif",
        fontSize: "60px",
        marginTop: "25px"  
        
      }}>Teoría del color</h1>

      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> ¿Qué es la teoría del color? </h2>
      <p  style={{
          padding: "10px" }}>
        Es el conjunto de principios y reglas que explican cómo se forman, se relacionan y se perciben los colores. 
        Busca responder: ¿Cómo se crean los colores? ¿Cómo se combinan de manera armónica? ¿Qué significados o efectos psicológicos transmiten?
      </p>
      
      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> Círculo cromático </h2>

      <p  style={{
          padding: "10px" }}>
        El círculo cromático es la representación básica de la teoría del color. 
        Organiza los colores primarios, secundarios y terciarios.
      </p>

      <p  style={{
          padding: "10px" }}>
        Los colores primarios son la base de todos los demás.
      </p>

      <CuadroColor nombre="Rojo" hex="#FF0000" />
      <CuadroColor nombre="Amarillo" hex="#FFFF00" />
      <CuadroColor nombre="Azul" hex="#0000FF" />

      <div style={{ height: "20px" }}></div>

      <p style={{
        padding: "10px" }}>
      Los colores secundarios se crean mezclando dos colores primarios.
      </p>

      <MezclaColores
        color1={{ nombre: "Azul", hex: "#0000FF" }}
        color2={{ nombre: "Amarillo", hex: "#FFFF00" }}
        mezcla={{ nombre: "Verde", hex: "#00FF00" }}
      />
      <MezclaColores
        color1={{ nombre: "Rojo", hex: "#FF0000" }}
        color2={{ nombre: "Amarillo", hex: "#FFFF00" }}
        mezcla={{ nombre: "Naranja", hex: "#ff8800ff" }}
      />
      <MezclaColores
        color1={{ nombre: "Rojo", hex: "#FF0000" }}
        color2={{ nombre: "Azul", hex: "#0000FF" }}
        mezcla={{ nombre: "Violeta", hex: "#800080" }}
      />

      <p style={{
        padding: "10px" }}>
      Los colores terciarios se crean mezclando un color primario y uno secundario vecino.
      Como por ejemplo:
      </p>
      
      <MezclaColores
        color1={{ nombre: "Rojo", hex: "#FF0000" }}
        color2={{ nombre: "Naranja", hex: "#ff7b00ff" }}
        mezcla={{ nombre: "      ", hex: "#c62c09ff" }}
      />
      <MezclaColores
        color1={{ nombre: "Azul", hex: "#3700ffff" }}
        color2={{ nombre: "Violeta", hex: "#800080" }}
        mezcla={{ nombre: "     ", hex: "#600bb6ff" }}
      />
     
      
      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> Propiedades del color </h2>
      <p style={{
        padding: "10px" }}>
      Cada color tiene tres dimensiones que permiten describirlo:
      </p>
      <ul style={{
        padding: "10px",
        listStyleType: "disc",
        marginLeft: "20px"
      }}>
        <li> Tono (Hue): el “nombre” del color (rojo, verde, azul…). </li>
        <li> Saturación: intensidad o pureza del color (un rojo fuerte vs. un rojo apagado). </li>
        <li> Valor o brillo (Luminosidad): qué tan claro u oscuro es. </li>
      </ul>


      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> Esquemas de armonía de color </h2>
      <p style={{
        padding: "10px" }}>
      Son combinaciones que suelen resultar agradables a la vista:
      </p>
      <ul style={{
        padding: "10px",
        listStyleType: "disc",
        marginLeft: "20px"
      }}>
        <li> Complementarios: colores opuestos en el círculo (ej. azul – naranja). </li>
        <li> Análogos: colores vecinos (ej. verde – azul – turquesa). </li>
        <li> Triádicos: tres colores equidistantes en el círculo (ej. rojo – amarillo – azul). </li>
        <li> Monocromáticos: variaciones de un mismo color (jugar con saturación y valor). </li>
      </ul>

      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> Psicología del color </h2>
      <p style={{
        padding: "10px" }}>
      Cada color suele transmitir ciertas sensaciones (aunque varían culturalmente):
      </p>
      <ul style={{
        padding: "10px",
        listStyleType: "disc",
        marginLeft: "20px"
      }}>
        <li> Rojo: pasión, energía, peligro. </li>
        <li> Azul: calma, confianza, seriedad. </li>
        <li> Amarillo: alegría, optimismo, atención. </li>
        <li> Verde: naturaleza, frescura, equilibrio. </li>
        <li> Negro: elegancia, misterio, poder. </li>
        <li> Blanco: pureza, paz, simplicidad. </li>
      </ul>

      <h2 style={{
        marginTop: "25px",
        marginBottom: "5px",
        padding: "10px",
      }}> Modelos de color </h2>
      <p style={{
        padding: "10px" }}>
      Dependiendo del contexto (arte, pantallas, impresión) se usan diferentes sistemas:
      </p>
      <ul style={{
        padding: "10px",
        listStyleType: "disc",
        marginLeft: "20px"
      }}>
        <li> RGB (Red, Green, Blue): mezcla aditiva, usada en pantallas. </li>
        <li> CMYK (Cyan, Magenta, Yellow, Key/Black): mezcla sustractiva, usada en impresión. </li>
        <li> HSV/HSB: describe colores según tono, saturación y brillo. </li>
      </ul>

      <Boton ruta="https://colorearte.cl/wp-content/uploads/2017/06/Teoria-del-Color.pdf" texto=" Mas aqui ... "/>
    </main>
  );
}
