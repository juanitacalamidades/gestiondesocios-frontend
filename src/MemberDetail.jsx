import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import Context from "./Context"



export default function MemberDetail() {
  const { id } = useParams()
  const {token,member,setMember,loading,setLoading} = useContext(Context)
  const [editMode, setEditMode] = useState({})
  const [formData, setFormData] = useState({})


    useEffect(() => {
    fetch(`https://gestiondesocios-backend.onrender.com/members/member/${id}`, {
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

        const toggleEdit = (block) => {
                setEditMode(prev => ({ ...prev, [block]: !prev[block] }))
            }

            const handleChange = (block, field, value) => {
            setFormData(prev => ({
            ...prev,
            [block]: {
                ...prev[block],
                [field]: value
            }
            }))
        }

        const handlePrimitiveChange = (field, value) => {
            setFormData(prev => ({
            ...prev,
            [field]: value
            }))
        }

       const saveChanges = (block, isNested = true) => {
        const updateData = isNested
            ? { [block]: formData[block] }
            : Object.fromEntries(
                Object.entries(formData).filter(([key]) =>
                [
                    "nombreEntidad",
                    "tipoSocio",
                    "status",
                    "antiguedad",
                    "provincia",
                    "clave",
                    "genero",
                    "razonSocial"
                ].includes(key)
                )
            )

            fetch("https://gestiondesocios-backend.onrender.com/members/member/edit", {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: member._id, updateData })
            })
                .then(res => res.json())
                .then(updated => {
                setMember(prev => ({ ...prev, ...updated }))
                toggleEdit(block)
                })
                .catch(err => console.error("Error al guardar:", err))
        }

        function toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
        }


  return <>
        <div className="p-4 p-4">
        <ul className="flex flex-col flex-wrap gap-4 md:h-[150vh] lg:h-[100vh]">
          {/* BLOQUE INFORMACIÓN GENERAL */}
             {/* BLOQUE GENERAL */}
            <li className="oro-data flex flex-col justify-between grow relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
           
            <ul className="flex flex-col">
                {editMode.general ? (
                <>
                    <input className="border p-1 my-1 font-bold text-xl" value={formData.nombreEntidad || ''} onChange={e => handlePrimitiveChange("nombreEntidad", e.target.value)} placeholder="Nombre Entidad" />
                    <select className="border p-1 my-1" value={formData.tipoSocio || ''} onChange={e => handlePrimitiveChange("tipoSocio", e.target.value)}>
                        <option value="festival">Festival</option>
                        <option value="compañía">Compañía</option>
                        <option value="distribuidora">Distribuidora</option>
                        <option value="otro">Otro</option>
                    </select>
                    <div className="my-1">
                        <label className="mr-2">
                            <input type="radio" name="status" value="activo" checked={formData.status === "activo"} onChange={e => handlePrimitiveChange("status", e.target.value)} />activo</label>
                        <label className="mr-2">
                            <input type="radio" name="status" value="ex-socio" checked={formData.status === "ex-socio"} onChange={e => handlePrimitiveChange("status", e.target.value)} />ex-socio</label>
                        <label>
                            <input type="radio" name="status" value="interesado" checked={formData.status === "pendiente"} onChange={e => handlePrimitiveChange("status", e.target.value)} />interesado</label>
                    </div>
                    <input type="number" min="0" className="border p-1 my-1" value={formData.antiguedad || ''} onChange={e => handlePrimitiveChange("antiguedad", e.target.value)} placeholder="Antigüedad (años)" />
                    <input className="border p-1 my-1" value={formData.provincia || ''} onChange={e => handlePrimitiveChange("provincia", e.target.value)} placeholder="Provincia" />
                    <input className="border p-1 my-1" value={formData.clave || ''} onChange={e => handlePrimitiveChange("clave", e.target.value)} placeholder="Clave" />
                    <input className="border p-1 my-1" value={formData.genero || ''} onChange={e => handlePrimitiveChange("genero", e.target.value)} placeholder="Género" />
                    <input className="border p-1 my-1" value={formData.razonSocial || ''} onChange={e => handlePrimitiveChange("razonSocial", e.target.value)} placeholder="Razón Social" />
                </>
                ) : (
                <>
                    <li><h2 className="text-xl dark font-bold mb-4">{toUpper(member.nombreEntidad)}</h2></li>
                    <li><p className="dark font-bold inline">Tipo:</p> <p className="inline">{member.tipoSocio}</p></li>
                    <li><p className="dark font-bold inline">Status:</p> <p className="inline">{member.status}</p></li>
                    <li><p className="dark font-bold inline">Antigüedad:</p> <p className="inline">{member.antiguedad} años</p></li>
                    <li><p className="dark font-bold inline">Provincia:</p> <p className="inline">{member.provincia}</p></li>
                    <li><p className="dark font-bold inline">Clave:</p> <p className="inline">{member.clave}</p></li>
                    <li><p className="dark font-bold inline">Género:</p> {member.genero}</li>
                    <li><p className="dark font-bold inline">Razón social:</p> <p className="inline">{member.razonSocial}</p></li>
                </>
                )}
            </ul>
             {editMode.general ? (
                <button onClick={() => saveChanges("general", false)} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                Guardar
                </button>
            ) : (
                <svg onClick={() => toggleEdit("general")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="self-end size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            )}
            </li>

             {/* BLOQUE CONTACTO */}
            <li className="oro-data flex flex-col justify-between relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
            <h2 className="mb-4 font-bold dark">Contacto:</h2>
            {editMode.contacto ? (
                <>
                <input className="border p-1 my-1" value={formData.contacto?.tlfnMovil || ''} onChange={e => handleChange("contacto", "tlfnMovil", e.target.value)} placeholder="Móvil" />
                <input className="border p-1 my-1" value={formData.contacto?.fijo || ''} onChange={e => handleChange("contacto", "fijo", e.target.value)} placeholder="Fijo" />
                <input className="border p-1 my-1" value={formData.contacto?.email1 || ''} onChange={e => handleChange("contacto", "email1", e.target.value)} placeholder="Email 1" />
                <input className="border p-1 my-1" value={formData.contacto?.email2 || ''} onChange={e => handleChange("contacto", "email2", e.target.value)} placeholder="Email 2" />
                </>
            ) : (
                <>
                <div className="">
                    <p>Móvil: {member.contacto?.tlfnMovil}</p>
                    <p>Fijo: {member.contacto?.fijo}</p>
                    <p>Email 1: {member.contacto?.email1}</p>
                    <p>Email 2: {member.contacto?.email2}</p>
                </div>
                </>
            )}
             {editMode.contacto ? (
                <button onClick={() => saveChanges("contacto")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
               Guardar
                </button>
            ) : (
                <svg onClick={() => toggleEdit("contacto")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            )}
            </li>


             {/* BLOQUE DIRECCIÓN FISCAL */}
            <li className="oro-data flex flex-col justify-between relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
          
            <h2 className="font-bold dark">Dirección Fiscal:</h2>
            {editMode.direccionFiscal ? (
                <>
                <input className="border p-1 my-1" value={formData.direccionFiscal?.calle || ''} onChange={e => handleChange("direccionFiscal", "calle", e.target.value)} placeholder="Calle" />
                <input className="border p-1 my-1" value={formData.direccionFiscal?.ciudad || ''} onChange={e => handleChange("direccionFiscal", "ciudad", e.target.value)} placeholder="Ciudad" />
                <input className="border p-1 my-1" value={formData.direccionFiscal?.provincia || ''} onChange={e => handleChange("direccionFiscal", "provincia", e.target.value)} placeholder="Provincia" />
                <input className="border p-1 my-1" value={formData.direccionFiscal?.codigoPostal || ''} onChange={e => handleChange("direccionFiscal", "codigoPostal", e.target.value)} placeholder="Código Postal" />
                </>
            ) : (
                <ul>
                    <li>Calle: {member.direccionFiscal?.calle}</li>
                    <li>Ciudad: {member.direccionFiscal?.ciudad}</li>
                    <li>Provincia: {member.direccionFiscal?.provincia}</li>
                    <li>Código Postal: {member.direccionFiscal?.codigoPostal}</li>
                </ul>
            )}
              {editMode.direccionFiscal ? (
                <button onClick={() => saveChanges("direccionFiscal")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
              Guardar
                </button>
            ) : (
                <svg onClick={() => toggleEdit("direccionFiscal")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            )}
            </li>

            {/* BLOQUE CUOTA */}
            <li className="oro-data flex flex-col justify-between relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
               
                <strong>Cuota:</strong>
                {editMode.cuota ? (
                    <>
                    <label>Pagada: <input type="checkbox" checked={formData.cuota?.pagada || false} onChange={e => handleChange("cuota", "pagada", e.target.checked)} /></label>
                    <input className="border p-1 my-1" type="date" value={formData.cuota?.fechaDePago?.split('T')[0] || ''} onChange={e => handleChange("cuota", "fechaDePago", e.target.value)} />
                    <label>Recibí: <input type="checkbox" checked={formData.cuota?.recibi || false} onChange={e => handleChange("cuota", "recibi", e.target.checked)} /></label>
                    </>
                ) : (
                    <ul>
                    <li>Pagada: {member.cuota?.pagada ? "Sí" : "No"}</li>
                    <li>Fecha de pago: {new Date(member.cuota?.fechaDePago).toLocaleDateString()}</li>
                    <li>Recibí: {member.cuota?.recibi ? "Sí" : "No"}</li>
                    </ul>
                )}
                 {editMode.cuota ? (
                    <button onClick={() => saveChanges("cuota")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                   Guardar
                    </button>
                ) : (
                    <svg onClick={() => toggleEdit("cuota")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                )}
                </li>

                {/* BLOQUE ACTIVO */}
                <li className="oro-data flex flex-col justify-between relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
               
                <strong>Activo:</strong>
                {editMode.activo ? (
                    <label><input type="checkbox" checked={formData.activo || false} onChange={e => handlePrimitiveChange("activo", e.target.checked)} /> Está activo</label>
                ) : (
                    <span>{member.activo ? "Sí" : "No"}</span>
                )}
                 {editMode.activo ? (
                    <button onClick={() => saveChanges("activo", false)} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                    Guardar
                    </button>
                ) : (
                    <svg onClick={() => toggleEdit("activo")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                )}
            </li>

             {/* BLOQUE COMISIÓN */}
            <li className="oro-data flex flex-col justify-between grow relative border border-black rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
               
                <strong>Comisión:</strong>
                {editMode.comision ? (
                    <>
                    <input className="border p-1 my-1" value={formData.comision?.miembro1 || ''} onChange={e => handleChange("comision", "miembro1", e.target.value)} placeholder="Miembro 1" />
                    <input className="border p-1 my-1" value={formData.comision?.miembro2 || ''} onChange={e => handleChange("comision", "miembro2", e.target.value)} placeholder="Miembro 2" />
                    <input className="border p-1 my-1" value={formData.comision?.miembro3 || ''} onChange={e => handleChange("comision", "miembro3", e.target.value)} placeholder="Miembro 3" />
                    </>
                ) : (
                    <ul>
                    <li>Miembro 1: {member.comision?.miembro1}</li>
                    <li>Miembro 2: {member.comision?.miembro2}</li>
                    <li>Miembro 3: {member.comision?.miembro3}</li>
                    </ul>
                )}
                 {editMode.comision ? (
                    <button onClick={() => saveChanges("comision")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                   Guardar
                    </button>
                ) : (
                    <svg onClick={() => toggleEdit("comision")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                )}
            </li>

        {/* BLOQUE OTROS */}
        <li className="oro-data flex flex-col justify-between relative border border-black rounded-[6px] p-2 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
          
            <strong>Otros:</strong>
            {editMode.otros ? (
                <>
                <label><input type="checkbox" checked={formData.otros?.catalogo || false} onChange={e => handleChange("otros", "catalogo", e.target.checked)} /> Catálogo</label>
                <label><input type="checkbox" checked={formData.otros?.directorio || false} onChange={e => handleChange("otros", "directorio", e.target.checked)} /> Directorio</label>
                <label><input type="checkbox" checked={formData.otros?.videoFoto || false} onChange={e => handleChange("otros", "videoFoto", e.target.checked)} /> Video/Foto</label>
                <fieldset className="mt-2">
                    <legend className="font-medium">Asambleas:</legend>
                    <label><input type="checkbox" checked={formData.otros?.asamblea?.primera || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, primera: e.target.checked })} /> Primera</label>
                    <label><input type="checkbox" checked={formData.otros?.asamblea?.segunda || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, segunda: e.target.checked })} /> Segunda</label>
                    <label><input type="checkbox" checked={formData.otros?.asamblea?.tercera || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, tercera: e.target.checked })} /> Tercera</label>
                </fieldset>
                </>
            ) : (
                <ul>
                    <li>Catálogo: {member.otros?.catalogo ? "Sí" : "No"}</li>
                    <li>Directorio: {member.otros?.directorio ? "Sí" : "No"}</li>
                    <li>Video/foto: {member.otros?.videoFoto ? "Sí" : "No"}</li>
                    <li><strong>Asambleas:</strong>
                        <ul className="flex flex-col">
                            <li>Primera: {member.otros?.asamblea?.primera ? "Sí" : "No"}</li>
                            <li>Segunda: {member.otros?.asamblea?.segunda ? "Sí" : "No"}</li>
                            <li>Tercera: {member.otros?.asamblea?.tercera ? "Sí" : "No"}</li>
                        </ul>
                    </li>
                </ul>
            )}
              {editMode.otros ? (
                <button onClick={() => saveChanges("otros")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                Guardar
                </button>
            ) : (
                <svg onClick={() => toggleEdit("otros")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            )}
            </li>

            {/* BLOQUE NOTAS */}
            <li className="oro-data flex flex-col justify-between relative rounded-[6px] p-4 w-full md:w-[48%] lg:w-[30%] bg-[#FAEEC6] border border-color">
               
                <strong>Notas:</strong>
                {editMode.notas ? (
                    <>
                    {formData.notas?.map((nota, index) => (
                        <input
                        key={index}
                        className="border p-1 my-1"
                        value={nota.nota || ''}
                        onChange={e => {
                            const nuevasNotas = [...formData.notas]
                            nuevasNotas[index].nota = e.target.value
                            setFormData(prev => ({ ...prev, notas: nuevasNotas }))
                        }}
                        />
                    ))}
                    </>
                ) : (
                    <ul className="oro-data flex flex-col grow">
                    {member.notas?.map((n, index) => (
                        <li className="w-full md:w-[48%]" key={index}>{n.nota}</li>
                    ))}
                    </ul>
                )}
                 {editMode.notas ? (
                    <button onClick={() => saveChanges("notas")} className="red-400 text-white px-4 py-1 rounded bg-hover-custom-green-900 mt-5">
                    Guardar
                    </button>
                ) : (
                    <svg onClick={() => toggleEdit("notas")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-end cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                )}
            </li>
        </ul>
        </div>
  </>

}
