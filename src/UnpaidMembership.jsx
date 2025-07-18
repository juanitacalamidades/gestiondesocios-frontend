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
                 <section className="flex flex-col lg:w-[680px] lg:mx-[50px]">
                    <h2 className="text-3xl font-bold dark  pb-6">Pendientes de pago</h2>
                    <ul className="space-y-3">
                        {
                            result.length == 0 ?
                            <p>No hay pagos pendientes</p> :
                            result.map( ({_id,nombreEntidad,provincia,tipoSocio,cuota}) => { return <li key={_id} className="p-3 flex flex-col items-start sm:items-center sm:flex-row justify-between border border-color rounded-[4px] mb-4 w-full bg-[#D3CAE6]"> 
                               <div>
                                <p className="text-lg font-medium dark pb-2">{toUpper(nombreEntidad)}</p>
                                <div className="flex">
                                  <div className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                      </svg>
                                      <p className="text-xs dark ml-2">{toUpper(provincia)}</p>
                                  </div>
                                  <div className="flex items-center  ml-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                      </svg>
                                      <p className="text-xs dark ml-2">{tipoSocio}</p>
                                  </div>
                                </div>
                                <p className="text-sm red py-2">
                                    {cuota?.pagada ? "Cuota pagada" : "Cuota sin pagar"}
                                </p>
                              </div>
                                <Link to={`/dashboard/members/${_id}`} className="bg-[#31234E] self-end text-sm light px-4 py-2 py-1 rounded bg-hover-custom-red-400">
                              Ver detalle</Link>
                            </li>
                            })
                        }
                    </ul>  
                </section>
               )}
            </>
}


