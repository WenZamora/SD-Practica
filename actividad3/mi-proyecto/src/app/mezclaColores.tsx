import CuadroColor from "./cuadroColor";

type Props = {
    color1: { nombre: string; hex: string };
    color2: { nombre: string; hex: string };
    mezcla: { nombre: string; hex: string };
};

export default function MezclaColores({color1, color2, mezcla}: Props) {
    return(
        <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "10px" }}>
            <CuadroColor nombre={color1.nombre} hex={color1.hex} />
            <span style={{ fontSize: "24" }}> + </span>
            <CuadroColor nombre={color2.nombre} hex={color2.hex} />
            <span style={{ fontSize: "24" }}> = </span>
            <CuadroColor nombre={mezcla.nombre} hex={mezcla.hex} />

        </div>
    );
}

