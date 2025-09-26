type Props = {
  nombre: string;
  hex: string;
};

export default function ColorCard({ nombre, hex }: Props) {
  return (
    <div style={{   backgroundColor: hex, 
                    padding: "20px", 
                    color: "#ffffffff", 
                    margin: "10px", 
                    borderRadius: "25px" }}>

      <h3 style= {{ textAlign: "center",
                    fontSize: "24px"  
                }}>{nombre}</h3>
      
    </div>
  );
}

