import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"


export default function Interested(){

    const {members,setMembers,token,setToken,loading,setLoading,interested,setInterested} = useContext(Context)


    useEffect(() => {
            fetch("http://localhost:4000/interested", {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then( response => response.json() )
            .then( interested => {
                
                setInterested(interested)
               
            })
            .catch(error => {
                console.error("error cargando socios")
            })
            .finally(() => {
                setLoading(false)
            })
    },[])

    function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    return  <>
                <section className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold">Lista de interesados</h2>
                    <ul className="space-y-3">
                        {
                            interested.length == 0 ?
                            <p>No hay socios registrados</p> :
                            interested.map( ({_id,nombreEntidad,provincia,tipoSocio,status}) => { return <li key={_id} className="p-3 border border-gray-300 rounded shadow-sm flex justify-between items-center"> 
                                <div>
                                    <p>{toUpper(nombreEntidad)}</p>
                                    <p>{toUpper(provincia)}</p>
                                    <p>{tipoSocio}</p>
                                    <p>{status}</p>
                                </div>
                                <Link to={`/dashboard/members/${_id}`} className="orange-400 text-white px-4 py-1 rounded bg-hover-custom-orange-900">Ver detalle</Link>
                            </li>
                            })
                        }
                    </ul>  
                </section>
    
            </>
}