import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Context from "./Context"
import EditableField from "./EditableField"


export default function MemberDetail() {
  const { id } = useParams()
  const {token,member,setMember,loading,setLoading} = useContext(Context)


  useEffect(() => {
    fetch(`http://localhost:4000/members/member/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then( response =>response.json())
      .then(data => setMember(data))
      .catch((error) => console.error("Error al cargar el socio:", error))
      .finally(() => setLoading(false))
  }, [id]);

  if (loading) return <p className="italic">Cargando datos del socio...</p>
  if (!member) return <p className="text-red-500">No se encontró el socio.</p>

  function handleSave(campo, valor) {
    fetch("http://localhost:4000/members/member/edit", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            id: member._id,
            updateData: { [campo]: valor }
            }),
            credentials: "include"
        })
        .then(res => res.json())
        .then(updated => {
            setMember(prev => ({ ...prev, ...updated }))
        })
        .catch(err => console.error("Error actualizando:", err))
    }

  return <>
        <div className="p-4 p-4">
        <ul className="flex flex-wrap gap-4">
            <li className="oro-data grow relative border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 right-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

                <ul className="flex flex-col">
                    <li><h2 className="text-xl font-bold mb-4">{member.nombreEntidad}</h2></li>
                    <li><strong>Tipo:</strong> {member.tipoSocio}</li>
                    <li><strong>Status:</strong> {member.status}</li>
                    <li><strong>Antigüedad:</strong> {member.antiguedad} años</li>
                    <li><strong>Provincia:</strong> {member.provincia}</li>
                    <li><strong>Clave:</strong> {member.clave}</li>
                    <li><strong>Género:</strong> {member.genero}</li>
                    <li><strong>Razón social:</strong> {member.razonSocial}</li>
                </ul>
            </li>

            <li className="oro-data flex flex-col border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Contacto:</strong>
                <ul>
                    <li>Móvil: {member.contacto?.tlfnMovil}</li>
                    <li>Fijo: {member.contacto?.fijo}</li>
                    <li>Email 1: {member.contacto?.email1}</li>
                    <li>Email 2: {member.contacto?.email2}</li>
                </ul>
            </li>

            <li className="oro-data flex flex-col border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Dirección Fiscal:</strong>
                <ul>
                    <li>Calle: {member.direccionFiscal?.calle}</li>
                    <li>Ciudad: {member.direccionFiscal?.ciudad}</li>
                    <li>Provincia: {member.direccionFiscal?.provincia}</li>
                    <li>Código Postal: {member.direccionFiscal?.codigoPostal}</li>
                </ul>
            </li>

            <li className="oro-data flex flex-col border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Cuota:</strong>
                <ul>
                    <li>Pagada: {member.cuota?.pagada ? "Sí" : "No"}</li>
                    <li>Fecha de pago: {new Date(member.cuota?.fechaDePago).toLocaleDateString()}</li>
                    <li>Recibí: {member.cuota?.recibi ? "Sí" : "No"}</li>
                </ul>
            </li>

            <li className="oro-data flex shrink-2 border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Activo:</strong> {member.activo ? "Sí" : "No"}</li>

            <li className="oro-data flex flex-col grow border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Comisión:</strong>
                <ul>
                    <li>Miembro 1: {member.comision?.miembro1}</li>
                    <li>Miembro 2: {member.comision?.miembro2}</li>
                    <li>Miembro 3: {member.comision?.miembro3}</li>
                </ul>
            </li>

            <li className="oro-data flex flex-col border border-black rounded-[2px] p-2 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Otros:</strong>
                <ul>
                    <li>Catálogo: {member.otros?.catalogo ? "Sí" : "No"}</li>
                    <li>Directorio: {member.otros?.directorio ? "Sí" : "No"}</li>
                    <li>Video/foto: {member.otros?.videoFoto ? "Sí" : "No"}</li>
                    <li>Asambleas:
                    <ul>
                        <li>Primera: {member.otros?.asamblea?.primera ? "Sí" : "No"}</li>
                        <li>Segunda: {member.otros?.asamblea?.segunda ? "Sí" : "No"}</li>
                        <li>Tercera: {member.otros?.asamblea?.tercera ? "Sí" : "No"}</li>
                    </ul>
                    </li>
                </ul>
            </li>

            <li className="oro-data flex flex-col grow border border-black rounded-[2px] p-4 w-full md:w-[48%] lg:w-[30%] bg-white shadow-sm"><strong>Notas:</strong>
                <ul>
                    {member.notas?.map((n, index) => (
                    <li key={index}>{n.nota}</li>
                    ))}
                </ul>
            </li>
        </ul>
        </div>
  </>

}
