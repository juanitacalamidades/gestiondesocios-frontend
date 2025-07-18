import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "./Context"

export default function Login(){

    let navigate = useNavigate()
    let {token,setToken,user,setUser} = useContext(Context)
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    return <div className="bg-[#DDF1E4] flex items-center justify-center min-h-screen">
            <form
            className="sm:w-[300px] md:w-[400px] flex flex-col max-w-md mx-auto mt-20 p-10 border border-color rounded-md shadow bg-[#261C39]"
            onSubmit={ e => {
                e.preventDefault()
                setErrorMsg(""); // limpiar errores previos


                fetch("https://gestiondesocios-backend.onrender.com/login",{
                    method : "POST",
                    body : JSON.stringify({
                        name : inputUsuario,
                        password : inputPassword 
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then( response => {
                    if(response.status == 200){
                        return response.json()
                        .then( ({token}) =>{
                            setToken(token)
                            setUser(user)
                            navigate("/dashboard/members")
                        } )
                    }else{
                       return setErrorMsg("La contraseña es incorrecta")
                    }
                })
                .catch( error => {
                   setErrorMsg("No se ha podido estableces conexión con el servidor")
                })



            }}>
                <label htmlFor="text" className="light mb-2">Nombre de usuario</label>
                <input type="text" id="text" placeholder="usuario" value={inputUsuario} onChange={e => setInputUsuario(e.target.value)} className="light mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <label htmlFor="password" className="light mb-2">Contraseña</label>
                <input type="password" id="password" placeholder="contraseña" value={inputPassword} onChange={e => setInputPassword(e.target.value)} className="light mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="pb-6 red italic">{ errorMsg }</p>
                <input type="submit" value="Login" className="cyan-400 bg-hover-custom-green-400 text-white py-2 rounded transition" />
            </form>
    
    
        </div>
}