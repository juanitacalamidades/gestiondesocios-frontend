import { useState, useContext } from "react"
import Context from "./Context"
import { Link } from "react-router-dom"

export default function SearchBar({ onResult }){

    let {token,msg,setMsg,loading,setLoading} = useContext(Context)
    let [input,setInput] = useState("")
    let [result,setResult] = useState([])

    function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return  <>
            <div className="w-full pb-6">
                <h2 className="text-lg font-semibold dark mb-1">Buscar socio</h2>
                <form className="flex gap-2 mb-4 flex-wrap" onSubmit={(e) => {
                    e.preventDefault()
                    // el campo no debe estar vacío
                    if(!input.trim()) {
                        onResult(null)
                        return 
                    }

                    setLoading(true)
                    setMsg("")
                    
                    fetch(`http://localhost:4000/members/member?name=${encodeURIComponent(input)}`, {
                        headers :{
                            Authorization : `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        onResult(data)
                        if(data.length === 0){
                            setMsg("No se encontraron coincidencias.")
                        }
                    })
                    .catch(() => setMsg("Error en la búsqueda"))
                    .finally(() => setLoading(false))


                }}>
                    <input placeholder="Introduce el nombre de la entidad" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} className="flex-1 border px-2 py-1 rounded text-sm dark"/>
                    <input type="submit" value="Buscar" className="cyan-400 light text-sm px-4 py-1 rounded bg-hover-custom-blue-400" />
                </form>

                {loading && <p className="italic text-gray-500">Buscando...</p>}
                {msg && <p className="text-red-500">{msg}</p>}

                <ul className="space-y-3">
                    {result.map(({ _id, nombreEntidad, provincia, tipoSocio }) => { return <li key={_id} className="p-3 border border-gray-300 rounded shadow-sm flex justify-between items-center">
                        <div>
                                <p className="text-sm dark">{toUpper(nombreEntidad)}</p>
                                <p className="text-sm dark">{toUpper(provincia)}</p>
                                <p className="text-sm dark">{tipoSocio}</p>
                        </div>
                        <Link to={`/dashboard/members/${_id}`} className="cyan-400 text-sm light px-4 py-1 rounded bg-hover-custom-orange-900">Ver detalle</Link>
                    </li>})}
                </ul>
            </div>
    
    
        </>
}