
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import Context from "./Context";

const types = ["Compañía", "Festival", "Distribuidora", "Otro"];

// Capitalizar el tipo 
function toUpper(string){
    return string.chatAt(0).toUpperCase() + string.slice(1)
}


export default function ByType() {

    const {loading,setLoading} = useContext(Context)
    const [selectedType, setSelectedType] = useState("Compañía");
    const [result, setResult] = useState([]);

    const { token } = useContext(Context);

    useEffect(() => {
        setLoading(true);

        fetch(`https://gestiondesocios-backend.onrender.com/?type=${encodeURIComponent(selectedType)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setResult(data))
        .catch(error => console.error("Error al cargar por tipo:", error))
        .finally(() => setLoading(false));
        }, [selectedType]);

    
        function toUpper(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    

    
    return <>
            {/* Tabs */}
            <section className="flex flex-col w-[680px] mx-[50px]">
                <div className="flex overflow-x-auto flex-nowrap  pb-6 rounded">
                    { types.map(type => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 text-lg ${
                        selectedType === type
                            ? "px-4 py-2 mr-4 cyan-400 light rounded"
                            : "mr-4 hover:bg-[#3AA99F] hover:text-white rounded"
                        }`}
                    >
                        {type}
                    </button>
                    ))}
                </div>
            {/* Resultados */}
            {loading ? (
                <p className="italic dark">Cargando socios de tipo {selectedType}...</p>
            ) : (
            
                    <ul>
                    { result.length === 0 ? (
                        <p className="red ml-5">No hay socios de tipo {selectedType}</p>
                    ) : (
                        result.map( ({_id,nombreEntidad,provincia,tipoSocio,status}) => { return <li key={_id}  className="p-3 flex items-center justify-between border border-color rounded-[4px] mb-4 w-full bg-[#D3CAE6]">
                            <div>
                                <p className="text-sm">{toUpper(nombreEntidad)}</p>
                                <p className="text-sm">{toUpper(provincia)}</p>
                                <p className="text-sm">{tipoSocio}</p>
                            </div>
                            <Link to={`/dashboard/members/${_id}`} className="red-400 light text-sm px-4 py-1 rounded bg-hover-custom-blue-400 transition">Ver detalle</Link>
                        </li>
                        })
                    )}
                    </ul>
            )}
            </section>
    </>
}
