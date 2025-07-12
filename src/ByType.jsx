
import { useState, useEffect, useContext } from "react";
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

    return (
        <div>
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
            { types.map(type => (
            <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded ${
                selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
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
                result.map( ({ _id, nombreEntidad }) => { return <li key={_id} className="border-b py-2">{nombreEntidad}</li> }
                )
            )}
            </ul>
        )}
        </div>
    );
}
