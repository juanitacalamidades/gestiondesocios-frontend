import { Link } from "react-router-dom"


export default function Header({ onToggleMenu }) {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3 bg-[#261C39] light md:static relative z-50">
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
    </header>
  )
}
