import Link from 'next/link';

type Props = {
    ruta: string;
    texto: string;
};

export default function Boton({ruta, texto}: Props) {
    return(
        <Link href={ruta}>
            <button style={{
                display: 'block',
                marginLeft: 'auto',
                backgroundColor: '#002147ff',
                border: 'solid', //tipos de bodes: solid, dashed, dotted
                borderColor: '#1a206794',
                color: '#757f9bff',
                borderRadius: '8px'
            }}>
                {texto}
            </button>
        </Link>

    )
};