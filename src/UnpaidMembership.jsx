import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "./Context";



export default function ByType() {
  const { loading, setLoading, token } = useContext(Context);
  const [selectedUnpaid, setSelectedUnpaid] = useState(true); // por defecto buscamos impagos
  const [result, setResult] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/members?unpaid=${selectedUnpaid}`, {
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
                 <section className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold">Pendientes de pago</h2>
                    <ul className="space-y-3">
                        {
                            result.length == 0 ?
                            <p>No hay pagos pendientes</p> :
                            result.map( ({_id,nombreEntidad,provincia,tipoSocio,cuota}) => { return <li key={_id} className="p-3 border border-gray-300 rounded shadow-sm flex justify-between items-center"> 
                                <div>
                                    <p className="text-lg mb-2">{toUpper(nombreEntidad)}</p>
                                    <p>{toUpper(provincia)}</p>
                                    <p>{toUpper(tipoSocio)}</p>
                                    <p className="text-red-600">
                                    Cuota pagada: {cuota?.pagada ? "Sí" : "No"}
                                    </p>
                                </div>
                                <Link to={`/dashboard/members/${_id}`} className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">Ver detalle</Link>
                            </li>
                            })
                        }
                    </ul>  
                </section>
               )}
            </>
}
