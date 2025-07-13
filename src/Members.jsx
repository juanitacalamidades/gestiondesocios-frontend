import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"
import SearchByName from "./SearchByName"

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
            <section className="flex flex-col">
                <div className="flex justify-between pt-4 text-lg">
                    <h2 className="text-xl font-bold">Todos los socios</h2>
                    <p>{members.length}</p>
                </div>
                <SearchByName onResult={setSearchResult} />
                <ul>
                    {
                        members.length == 0 ?
                        <p>No hay socios registrados</p> :
                       (searchResult.length > 0 ? searchResult : members).map( ({_id,nombreEntidad,provincia,tipoSocio,cuota}) => { return  <li key={_id}  className="flex items-center justify-between border-b border-color rounded-[2px] mb-4 w-full">
                            <div>
                                <p>{toUpper(nombreEntidad)}</p>
                                <p>{toUpper(provincia)}</p>
                                <p>{tipoSocio}</p>
                                <p>{cuota.pagada}</p>
                            </div>
                            <Link to={`/dashboard/members/${_id}`} className="orange-400 text-white px-4 py-1 rounded bg-hover-custom-orange-900">
                            Ver detalle</Link>
                        </li>
                        })
                    }
                </ul>
            </section>
    </>
}