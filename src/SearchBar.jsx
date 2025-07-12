import { useState } from "react"

export default function SearchBar({ onSearch }){

    const [query,setQuery] = useState("")

    function handleChange(e){
        const value = e.target.value 

        setQuery(value)

        // Expresión regular para el texto en input
        const regex = new RegExp(value, "ig")
        onSearch(regex)
    }

    return  <input className="border border-gray-300 px-4 py-2 rounded w-full mb-4" type="text" placeholder="Buscar..."value={query} onChange={handleChange} />
}