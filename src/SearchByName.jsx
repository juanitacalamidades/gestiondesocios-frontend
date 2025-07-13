import { useState, useContext } from "react"
import Context from "./Context"
import { Link } from "react-router-dom"

export default function SearchByName({ onResult }){

    let {token,msg,setMsg,loading,setLoading} = useContext(Context)
    let [input,setInput] = useState("")
    let [result,setResult] = useState([])

    function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return  <>
            <div className="max-w-xl py-4">
            <h2 className="text-m font-semibold mb-1">Buscar socio por nombre</h2>
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
                <input placeholder="Introduce nombre de la entidad" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} className="flex-1 border border-gray-400 px-2 py-1 rounded"/>
                <input type="submit" value="Buscar" className="blue-400 text-white px-4 py-1 rounded bg-hover-custom-blue-400" />
            </form>

            {loading && <p className="italic text-gray-500">Buscando...</p>}
            {msg && <p className="text-red-500">{msg}</p>}

            <ul className="space-y-3">
                {result.map(({ _id, nombreEntidad, provincia, tipoSocio }) => { return <li key={_id} className="p-3 border border-gray-300 rounded shadow-sm flex justify-between items-center">
                    <div>
                            <p>{toUpper(nombreEntidad)}</p>
                            <p>{toUpper(provincia)}</p>
                            <p>{tipoSocio}</p>
                    </div>
                    <Link to={`/dashboard/members/${_id}`} className="orange-400 text-white px-4 py-1 rounded bg-hover-custom-orange-900">Ver detalle</Link>
                </li>})}
            </ul>
            </div>
    
    
        </>
}