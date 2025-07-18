import { Link, useNavigate } from "react-router-dom"

export default function Aside( {isOpen, onClose} ){
    let navigate = useNavigate()

    return <>
              {/* Sidebar - 20% ancho */}
                <aside className={`
                    fixed top-0 left-0 h-full w-[100%] bg-[#261C39] pt-10 pb-6 z-50 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:static md:translate-x-0 md:w-[20%] md:flex
                    flex flex-col justify-between
                `}>
                    <nav className="flex flex-col">
                        <Link to="members" onClick={onClose} className="light nav-item-hover-active flex items-center px-4 py-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <span className="ml-2 light text-sm  nav-item-hover-active">Ver todos los socios activos</span> 
                        </Link>

                        <Link to="by-type" onClick={onClose} className="light nav-item-hover-active  flex items-center px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <span className="ml-2 light text-sm  nav-item-hover-active">Tipos de socio</span>

                        </Link>

                        <Link to="members/new" onClick={onClose} className="light nav-item-hover-active flex items-center px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        <span className="ml-2 light text-sm  nav-item-hover-active">Crear nuevo socio</span>
                        </Link>

                        <Link to="unpaid" onClick={onClose} className="light nav-item-hover-active flex items-center px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className="ml-2 light text-sm  nav-item-hover-active">Pendientes de pago</span>
                        </Link>

                        <Link to="interested" onClick={onClose} className="light nav-item-hover-active flex items-center px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                        <span className="ml-2 light text-sm  nav-item-hover-active">Interesados</span>
                        </Link>
                    </nav>
                     <button
                        onClick={onClose}
                        className="block md:hidden absolute top-4 right-4 light nav-item-hover-active"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button onClick={() => {
                        fetch("http://localhost:4000/logout", {
                                method: "POST"
                                })
                                .then(() => {
                                    navigate("/login")
                            })
                    }} className="bg-[#31234E] light border border-color text-black px-4 mx-6 py-2 rounded hover:bg-[#D14D41]">Cerrar sesión</button>
                </aside>
    
        </>
}