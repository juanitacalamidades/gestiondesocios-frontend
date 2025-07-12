import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"

export default function Members(){

    let {members,setMembers,hasMembers,setHasMembers,token,setToken} = useContext(Context)
    let [cargando, setCargando] = useState(true);

   
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
                setCargando(false)
            })
        }else{
            setCargando(false)
        }
    },[])

    if(cargando) return <p className="text-gray-600 italic">Cargando...</p>




    return <>
            <ul>
                {
                    members.length == 0 ?
                    <p>No hay socios registrados</p> :
                    members.map( ({_id,nombreEntidad,tipoSocio}) => { return  <li key={_id}><p>{nombreEntidad}</p><p>{tipoSocio}</p></li>
                    })
                }
            </ul>

    
    </>
}