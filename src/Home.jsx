import { Link } from "react-router-dom"


export default function Home(){
    return <>
            <div className="flex flex-col justify-center items-start md:items-center min-h-screen mx-[20px] md:mx-[222px] gap-8 md:w-1/2">
            <section className="w-full ">
            <h1 className="text-3xl font-bold">Rabotnik</h1>
            <p className="mt-2 text-sm">
                Rabotnik es una herramienta digital diseñada para gestionar de forma eficiente la base de datos de socios de la Asociación de Artes de Calle del País Vasco. 
            </p>
            </section>
              <nav className="w-full  text-center">
                <ul>
                <li className="w-full">
                    <Link
                    to="/login"
                    className="block w-full md:w-fit bg-[#31234E] text-white text-sm px-4 py-2 rounded hover:bg-[#513570]"
                    >
                    Accede a tu cuenta
                    </Link>
                </li>
                </ul>
            </nav>
        </div>
        </>
}