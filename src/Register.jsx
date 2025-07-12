
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "./Context"



export default function Register(){

    let navigate = useNavigate()
    let {setToken} = useContext(Context)
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")


    return <>
            <h2>Regístrate para usar Rabotnik</h2>
        

            <form onSubmit={ async e => {
                e.preventDefault()
                setErrorMsg(""); // limpiar errores previos


                try{

                    const response = await  fetch("http://localhost:4000/register",{
                            method : "POST",
                            body : JSON.stringify({
                                name : inputUsuario,
                                password : inputPassword 
                            }),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        })

                        if(response.ok){ // cualquier status 2xx
                            const { token } = await response.json()
                            setToken(token)
                            setInputUsuario("")
                            setInputPassword("")
                            navigate("/dashboard")
                        }else{
                            const errorData = await response.json().catch(() => ({})) //si no hay json, evitar crash
                            setErrorMsg("Error al registrarse. Intenta de nuevo.")
                        }

                }catch(error){
                    setErrorMsg("No se ha podido estableces conexión con el servidor. Intenta registrarte más tarde.")
                }

              

            }}>
                <label htmlFor="text">Nombre de usuario</label>
                <input type="text" id="text" placeholder="introduce un nombre de usuario" value={inputUsuario} onChange={e => setInputUsuario(e.target.value)} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="introduce una contraseña segura" value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
            <p>{ errorMsg }</p>
        
        
        </>
}