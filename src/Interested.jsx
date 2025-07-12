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



    return  <>
                <h2 className="text-xl font-bold">Lista de interesados</h2>
                <ul>
                    {
                        interested.length == 0 ?
                        <p>No hay socios registrados</p> :
                        interested.map( ({_id,nombreEntidad,tipoSocio,status}) => { return <li key={_id}>
                            <p>{nombreEntidad}</p>
                            <p>{tipoSocio}</p>
                            <p>{status}</p>
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