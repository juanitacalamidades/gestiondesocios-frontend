import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "./Context"

export default function Login(){

    let navigate = useNavigate()
    let {token,setToken,user,setUser} = useContext(Context)
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    return <>
            <form onSubmit={ e => {
                e.preventDefault()
                setErrorMsg(""); // limpiar errores previos


                fetch("http://localhost:4000/login",{
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
                            navigate("/dashboard")
                        } )
                    }else{
                       return setErrorMsg("La contraseña es incorrecta")
                    }
                })
                .catch( error => {
                   setErrorMsg("No se ha podido estableces conexión con el servidor")
                })



            }}>
                <label htmlFor="text">Nombre de usuario</label>
                <input type="text" id="text" placeholder="usuario" value={inputUsuario} onChange={e => setInputUsuario(e.target.value)} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="contraseña" value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
            <p>{ errorMsg }</p>
    
    
        </>
}