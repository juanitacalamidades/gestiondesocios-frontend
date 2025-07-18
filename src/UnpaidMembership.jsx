import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "./Context";



export default function ByType() {
  const { loading, setLoading, token } = useContext(Context);
  const [selectedUnpaid, setSelectedUnpaid] = useState(true); // por defecto buscamos impagos
  const [result, setResult] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(`https://gestiondesocios-backend.onrender.com/members?unpaid=${selectedUnpaid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(error => console.error("Error al cargar impagos:", error))
      .finally(() => setLoading(false));
  }, [selectedUnpaid]);


    // Capitalizar el tipo
    function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

      return  <>
               {loading ? (
                <p>Cargando...</p>) : (
                 <section className="flex flex-col gap-6 w-[680px] mx-[50px]">
                    <h2 className="text-3xl font-bold dark">Pendientes de pago</h2>
                    <ul className="space-y-3">
                        {
                            result.length == 0 ?
                            <p>No hay pagos pendientes</p> :
                            result.map( ({_id,nombreEntidad,provincia,tipoSocio,cuota}) => { return <li key={_id} className="p-3 border border-gray-300 rounded shadow-sm flex justify-between items-center"> 
                                <div>
                                    <p className="text-base dark mb-2">{toUpper(nombreEntidad)}</p>
                                    <p className="text-sm dark" >{toUpper(provincia)}</p>
                                    <p className="text-sm dark" >{toUpper(tipoSocio)}</p>
                                    <p className="text-sm red">
                                    Cuota pagada: {cuota?.pagada ? "Sí" : "No"}
                                    </p>
                                </div>
                                <Link to={`/dashboard/members/${_id}`} className="text-sm red-400 light px-4 py-1 rounded bg-hover-custom-orange-900 transition">Ver detalle</Link>
                            </li>
                            })
                        }
                    </ul>  
                </section>
               )}
            </>
}
