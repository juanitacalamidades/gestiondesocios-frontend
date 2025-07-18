import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"


export default function Interested(){

    const {members,setMembers,token,setToken,loading,setLoading,interested,setInterested} = useContext(Context)


    useEffect(() => {
            fetch("https://gestiondesocios-backend.onrender.com/interested", {
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
                <section className="flex flex-col gap-6 w-[680px] ml-[50px]">
                    <h2 className="text-3xl font-bold dark">Lista de interesados</h2>
                    <ul className="space-y-3">
                        {
                            interested.length == 0 ?
                            <p>No hay socios registrados</p> :
                            interested.map( ({_id,nombreEntidad,provincia,tipoSocio,status}) => { return <li key={_id} className="p-3 border border-color rounded shadow-sm flex justify-between items-center"> 
                                <div>
                                    <p className="dark text-base">{toUpper(nombreEntidad)}</p>
                                    <p className="dark text-sm">{toUpper(provincia)}</p>
                                    <p className="dark text-sm">{tipoSocio}</p>
                                    <p className="dark text-sm">{status}</p>
                                </div>
                                <Link to={`/dashboard/members/${_id}`} className="text-sm red-400 text-white px-4 py-1 rounded bg-hover-custom-blue-900 transition">Ver detalle</Link>
                            </li>
                            })
                        }
                    </ul>  
                </section>
    
            </>
}