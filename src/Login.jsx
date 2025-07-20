import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Context from "./Context"

export default function Login(){

    let navigate = useNavigate()
    let {token,setToken,user,setUser} = useContext(Context)
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    return <section className="min-h-screen">
             <Link to="/" className="flex items-center p-4 dark nav-item-hover-active">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p className="ml-2 text-xs md:text-sm">Volver atrás</p>
             </Link>
            <div className="bg-[#E6E4D9] flex items-center justify-center">
            <form
            className="sm:w-[320px] md:w-[400px] flex flex-col max-w-md mx-auto mt-20 p-10 border border-color rounded-md shadow bg-[#3C2A62]"
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
                    setErrorMsg("Error en el servidor")
                })



            }}>
                <label htmlFor="text" className="text-xs light mb-2">Nombre de usuario</label>
                <input type="text" id="text" placeholder="usuario" value={inputUsuario} onChange={e => setInputUsuario(e.target.value)} className="light text-xs mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <label htmlFor="password" className="light text-xs mb-2">Contraseña</label>
                <input type="password" id="password" placeholder="contraseña" value={inputPassword} onChange={e => setInputPassword(e.target.value)} className="light text-xs mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs pb-6 red italic">{ errorMsg }</p>
                <input type="submit" value="Login" className="text-xs cyan-400 bg-hover-custom-red-400 text-white py-2 rounded transition" />
            </form>
        </div>
    </section>
}