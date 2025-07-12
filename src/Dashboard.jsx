import { Outlet, Link, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"





export default function Dashboard(){

    let {token, setToken, user, setUser} = useContext(Context)
    let navigate = useNavigate()


    // Función que cierra la sesión
    function handleLogout(){
        fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include"
        })
        .then(() => {
            navigate("/login");
      });
    }



    return <>
    
            { token == "" ? <Navigate to="/login" /> : 
            <>
             <header className="h-[20vh] bg-gray-200 flex items-center justify-between px-6 shadow-md">
                <h1 className="text-2xl font-bold">Hola, <strong>{user}</strong></h1>
                <div>
                <span className="mr-4"></span>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Cerrar sesión
                </button>
                </div>
            </header>
           
            {/* Contenedor principal */}
            <div className="flex h-[80vh]">
                {/* Sidebar - 20% ancho */}
                <aside className="w-[20%] bg-gray-100 p-4 border-r">
                <nav className="flex flex-col space-y-4">
                    <Link to="members" className="text-blue-600 hover:underline">
                    Ver todos los socios
                    </Link>

                    <Link to="by-type" className="text-blue-600 hover:underline">
                    Buscar por tipo
                    </Link>

                    <Link to="interesados" className="text-blue-600 hover:underline">
                    Interesados
                    </Link>

                    <Link to="members/new" className="text-blue-600 hover:underline">
                    Crear nuevo socio
                    </Link>
                </nav>
                </aside>

                {/* Zona de resultados - 80% ancho */}
                <main className="w-[80%] p-6 overflow-y-auto">
                <Outlet />
                </main>
            </div>
            </>}
    
        </>
}