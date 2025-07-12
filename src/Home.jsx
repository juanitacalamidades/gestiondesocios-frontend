import { Navigate, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Context from "./Context"


export default function Home(){
    return <>
            <nav>
                <ul>
                    <li><Link to="/login">Entra a tu cuenta</Link></li>
                    <li><Link to="/register">Regístrate</Link></li>
                </ul>
            </nav>
            <section>
                <h1>Rabotnik</h1>
                <p>Rabotnik es una herramienta digital para la gestión de socios</p>
            </section>
    
    
        </>
}