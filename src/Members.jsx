import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"
import SearchBar from "./SearchBar"

export default function Members(){

    let {members,setMembers,hasMembers,setHasMembers,token,setToken,loading,setLoading} = useContext(Context)
    let [searchResult,setSearchResult] = useState([])



    useEffect(() => {
        if(!hasMembers){
            fetch("http://localhost:4000/members", {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then( response => response.json() )
            .then( members => {
              
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

    function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(loading) return <p className="text-gray-600 italic">Cargando...</p>

    return <>
            <section className="flex flex-col w-[680px] mx-[50px]">
                <SearchBar onResult={setSearchResult} />
                <div className="flex justify-between items-center pb-6 text-lg">
                    <h2 className="text-3xl font-bold dark">Todos los socios</h2>
                    <p className="text-xs">{members.length}</p>
                </div>
                <ul>
                    {
                        members.length == 0 ?
                        <p>No hay socios registrados</p> :
                       (searchResult.length > 0 ? searchResult : members).map( ({_id,nombreEntidad,provincia,tipoSocio,cuota}) => { return  <li key={_id}  className="p-3 flex items-center justify-between border border-color rounded-[4px] mb-4 w-full bg-[#D3CAE6]">
                            <div>
                                <p className="text-sm dark">{toUpper(nombreEntidad)}</p>
                                <p className="text-sm dark">{toUpper(provincia)}</p>
                                <p className="text-sm dark">{tipoSocio}</p>
                                <p className="text-sm dark">{cuota.pagada}</p>
                            </div>
                            <Link to={`/dashboard/members/${_id}`} className="red-400 text-sm light px-4 py-1 rounded bg-hover-custom-blue-400">
                            Ver detalle</Link>
                        </li>
                        })
                    }
                </ul>
            </section>
    </>
}