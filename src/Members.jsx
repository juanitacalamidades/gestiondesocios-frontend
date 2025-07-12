import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"
import SearchBar from "./SearchBar"

export default function Members(){

    let {members,setMembers,hasMembers,setHasMembers,token,setToken,loading,setLoading} = useContext(Context)
    let [filtered, setFiltered] = useState([])
    let [highlight, setHighlight] = useState(null) // guarda la RegExp actual

   
    useEffect(() => {
        if(!hasMembers){
            fetch("http://localhost:4000/members", {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then( response => response.json() )
            .then( members => {
                setFiltered(members)
                setMembers(members)
                setHasMembers(true)
            })
            .catch(error => {
                console.error("error cargando socios")
            })
            .finally(() => {
                setLoading(false)
            })
        }else{
            setLoading(false)
        }
    },[])

    function handleSearch(regex) {
        setHighlight(regex)
        
        if (regex.source === "") {
            setFiltered(members);
        } else {
            setFiltered(members.filter(({ nombreEntidad }) => regex.test(nombreEntidad)));
        }
    }

    // Función para resaltar coincidencias
    function emphasize(text, regex) {
        if (!regex) return text;
        return text.replace(regex, match => `<span class="bg-yellow-200">${match}</span>`);
    }

    if(loading) return <p className="text-gray-600 italic">Cargando...</p>

    const showMsg = highlight?.source !== "" && filtered.length === 0;


    return <>
            <SearchBar onSearch={handleSearch} />
            <ul>
            {showMsg ? (
                <p className="text-gray-500 italic">El nombre no coincide</p>
            ) : (
                filtered.map(({ _id, nombreEntidad }) => (
                <li
                    key={_id}
                    className="border-b py-2"
                    dangerouslySetInnerHTML={{ // inyectar html crudo con esta sugerente propiedad de react, ¿por qué no?
                    __html: emphasize(nombreEntidad, highlight)
                    }}
                />
                ))
            )}
            </ul>
            <ul>
                {
                    members.length == 0 ?
                    <p>No hay socios registrados</p> :
                    members.map( ({_id,nombreEntidad,tipoSocio}) => { return <li key={_id}>
                        <div>
                            <p>{nombreEntidad}</p>
                            <p>{tipoSocio}</p>
                        </div>
                        <Link
                            to={`/dashboard/members/${_id}`}
                            className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            Ver detalle
                        </Link>
                    </li>
                    })
                }
            </ul>

    
    </>
}