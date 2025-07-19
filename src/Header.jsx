import { Link } from "react-router-dom"


export default function Header({ onToggleMenu }) {
  return (
    <header className="flex items-center justify-between border-b px-4 py-6 bg-[#261C39] light md:static relative z-50">
      <Link to="members"><h1 className="sm:text-sm lg:text-lg font-bold">Panel de socios</h1></Link>

      {/* Botón hamburguesa: solo visible en móviles */}
      <button
        onClick={onToggleMenu}
        className="md:hidden focus:outline-none"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
       <button onClick={() => {
          fetch("https://gestiondesocios-backend.onrender.com/logout", {
                  method: "POST"
                  })
                  .then(() => {
                      navigate("/login")
              })
      }} className="gap-2 justify-center items-center bg-[#31234E] light border border-color text-black px-4 mx-6 py-2 rounded hover:bg-[#D14D41] hidden md:flex">Cerrar sesión 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
      </button>
    </header>
  )
}
