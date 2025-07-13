
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

        fetch(`http://localhost:4000/members?type=${encodeURIComponent(selectedType)}`, {
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
    

    
    return (
        <div>
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 green-900 p-4 rounded">
            { types.map(type => (
            <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded ${
                selectedType === type
                    ? "green-400 text-white"
                    : "green-900 bg-hover-custom-green-400 text-white"
                }`}
            >
                {type}
            </button>
            ))}
        </div>

        {/* Resultados */}
        {loading ? (
            <p className="italic text-gray-500">Cargando socios de tipo {selectedType}...</p>
        ) : (
            <ul>
            { result.length === 0 ? (
                <p>No hay socios de tipo {selectedType}</p>
            ) : (
                result.map( ({_id,nombreEntidad,provincia,tipoSocio,status}) => { return <li key={_id}  className="flex items-center justify-between p-4 border border-black rounded-[2px] p-4 mb-4 w-full">
                    <div>
                        <p>{toUpper(nombreEntidad)}</p>
                        <p>{toUpper(provincia)}</p>
                        <p>{tipoSocio}</p>
                        <p>{status}</p>
                    </div>
                    <Link to={`/dashboard/members/${_id}`} className="orange-400 text-white px-4 py-1 rounded bg-hover-custom-orange-900">Ver detalle</Link>
                </li>
                })
            )}
            </ul>
        )}
        </div>
    );
}
