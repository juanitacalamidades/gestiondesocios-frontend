import { Outlet, Navigate } from "react-router-dom"
import { useState, useContext } from "react"
import Context from "./Context"
import Header from "./Header"
import Aside from "./Aside"




export default function Dashboard(){

    let {token, setToken, user, setUser} = useContext(Context)
    let [menuOpen,setMenuOpen] = useState(false)



    return <>
    
            { token == "" ? <Navigate to="/login" /> : 
            <>
             <div className="h-screen flex flex-col">
                <Header onToggleMenu={() => setMenuOpen(prev => !prev)} />
                    {menuOpen && (
                        <div
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                        ></div>
                    )}
            

                    <div className="flex flex-1 overflow-hidden bg-[#E2D9E9]">
                        <Aside isOpen={menuOpen} onClose={() => setMenuOpen(false)} className="h-full overflow-y-auto" />
                        <main className="flex-1 overflow-y-auto pt-9 px-4">
                        <Outlet />
                        </main>
                    </div>
                </div>
            </>}
    
        </>
}