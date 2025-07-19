import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import Context from "./Context"
import InfoBlock from "./InfoBlock"




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
  if (!member) return <p className="text-red-500">No se ha encontrado el socio.</p>

        // Función toggle para activar/desativar el modo de edición
        const toggleEdit = (block) => {
                setEditMode(prev => ({ ...prev, [block]: !prev[block] }))
            }

            // Función para manejar la información en los bloques anidados
            const handleChange = (block, field, value) => {
            setFormData(prev => ({
            ...prev,
            [block]: {
                ...prev[block],
                [field]: value
            }
            }))
        }

        // Función para manejar los campos que no están anidados
        const handlePrimitiveChange = (field, value) => {
            setFormData(prev => ({
            ...prev,
            [field]: value
            }))
        }

        // Filtra los campos simples de formData (no anidados) que pertenecen al bloque "general" y los convierte nuevamente en un objeto para enviarlo al backend.
        //  Solo se incluyen las claves definidas en la lista (nombreEntidad, tipoSocio, etc.).
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
        <div className="p-4">
        <ul className="flex flex-wrap gap-4 md:h-[150vh] lg:h-[100vh] ">
          {/* BLOQUE INFORMACIÓN GENERAL */}
             {/* BLOQUE GENERAL */}
            <InfoBlock
                title="Información general"
                block="general"
                editMode={editMode}
                toggleEdit={toggleEdit}
                saveChanges={saveChanges}
                >
            {editMode.general ? (
                <>
                <input className="border p-1 my-1 text-sm font-bold text-xl" value={formData.nombreEntidad || ''} onChange={e => handlePrimitiveChange("nombreEntidad", e.target.value)} placeholder="Nombre Entidad" />
                <select className="border p-1 my-1 text-sm" value={formData.tipoSocio || ''} onChange={e => handlePrimitiveChange("tipoSocio", e.target.value)}>
                    <option value="festival">Festival</option>
                    <option value="compañía">Compañía</option>
                    <option value="distribuidora">Distribuidora</option>
                    <option value="otro">Otro</option>
                </select>
                <div className="my-1">
                    <label className="mr-2"><input type="radio" name="status" value="activo" checked={formData.status === "activo"} onChange={e => handlePrimitiveChange("status", e.target.value)} /> activo</label>
                    <label className="mr-2"><input type="radio" name="status" value="ex-socio" checked={formData.status === "ex-socio"} onChange={e => handlePrimitiveChange("status", e.target.value)} /> ex-socio</label>
                    <label><input type="radio" name="status" value="pendiente" checked={formData.status === "pendiente"} onChange={e => handlePrimitiveChange("status", e.target.value)} /> interesado</label>
                </div>
                <input type="number" min="0" className="border p-1 my-1 text-sm" value={formData.antiguedad || ''} onChange={e => handlePrimitiveChange("antiguedad", e.target.value)} placeholder="Antigüedad (años)" />
                <input className="border p-1 my-1 text-sm" value={formData.provincia || ''} onChange={e => handlePrimitiveChange("provincia", e.target.value)} placeholder="Provincia" />
                <input className="border p-1 my-1 text-sm" value={formData.clave || ''} onChange={e => handlePrimitiveChange("clave", e.target.value)} placeholder="Clave" />
                <input className="border p-1 my-1 text-sm" value={formData.genero || ''} onChange={e => handlePrimitiveChange("genero", e.target.value)} placeholder="Género" />
                <input className="border p-1 my-1 text-sm" value={formData.razonSocial || ''} onChange={e => handlePrimitiveChange("razonSocial", e.target.value)} placeholder="Razón Social" />
                </>
            ) : (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                <p className="sm:text-xs md:text-sm font-medium">Nombre:</p><p className="sm:text-xs md:text-sm">{member.nombreEntidad}</p>
                <p className="sm:text-xs md:text-sm font-medium">Tipo:</p><p className="sm:text-xs md:text-sm">{member.tipoSocio}</p>
                <p className="sm:text-xs md:text-sm font-medium">Status:</p><p className="sm:text-xs md:text-sm">{member.status}</p>
                <p className="sm:text-xs md:text-sm font-medium">Antigüedad:</p><p className="sm:text-xs md:text-sm">{member.antiguedad} años</p>
                <p className="sm:text-xs md:text-sm font-medium">Provincia:</p><p className="sm:text-xs md:text-sm">{member.provincia}</p>
                <p className="sm:text-xs md:text-sm font-medium">Clave:</p><p className="sm:text-xs md:text-sm">{member.clave}</p>
                <p className="sm:text-xs md:text-sm font-medium">Género:</p><p className="sm:text-xs md:text-sm">{member.genero}</p>
                <p className="sm:text-xs md:text-sm font-medium">Razón Social:</p><p className="sm:text-xs md:text-sm">{member.razonSocial}</p>
                </ul>
            )}
            </InfoBlock>


             {/* BLOQUE CONTACTO */}
            <InfoBlock
                title="Contacto"
                block="contacto"
                editMode={editMode}
                toggleEdit={toggleEdit}
                saveChanges={saveChanges}
                >
                {editMode.contacto ? (
                    <>
                    <input className="border p-1 my-1 text-sm" value={formData.contacto?.tlfnMovil || ''} onChange={e => handleChange("contacto", "tlfnMovil", e.target.value)} placeholder="Móvil" />
                    <input className="border p-1 my-1 text-sm" value={formData.contacto?.fijo || ''} onChange={e => handleChange("contacto", "fijo", e.target.value)} placeholder="Fijo" />
                    <input className="border p-1 my-1 text-sm" value={formData.contacto?.email1 || ''} onChange={e => handleChange("contacto", "email1", e.target.value)} placeholder="Email 1" />
                    <input className="border p-1 my-1 text-sm" value={formData.contacto?.email2 || ''} onChange={e => handleChange("contacto", "email2", e.target.value)} placeholder="Email 2" />
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <p className="sm:text-xs md:text-sm font-medium">Móvil:</p> <p className="sm:text-xs md:text-sm">{member.contacto?.tlfnMovil || "-"}</p>
                    <p className="sm:text-xs md:text-sm font-medium">Fijo:</p> <p className="sm:text-xs md:text-sm">{member.contacto?.fijo || "-"}</p>
                    <p className="sm:text-xs md:text-sm font-medium">Email 1:</p> <p className="sm:text-xs md:text-sm">{member.contacto?.email1 || "-"}</p>
                    <p className="sm:text-xs md:text-sm font-medium">Email 2:</p> <p className="sm:text-xs md:text-sm">{member.contacto?.email2 || "-"}</p>
                    </div>
                )}
                </InfoBlock>



             {/* BLOQUE DIRECCIÓN FISCAL */}
                <InfoBlock
                    title="Dirección Fiscal"
                    block="direccionFiscal"
                    editMode={editMode}
                    toggleEdit={toggleEdit}
                    saveChanges={saveChanges}

                    >
                    {editMode.direccionFiscal ? (
                        <>
                        <input className="border p-1 my-1 text-sm" value={formData.direccionFiscal?.calle || ''} onChange={e => handleChange("direccionFiscal", "calle", e.target.value)} placeholder="Calle" />
                        <input className="border p-1 my-1 text-sm" value={formData.direccionFiscal?.ciudad || ''} onChange={e => handleChange("direccionFiscal", "ciudad", e.target.value)} placeholder="Ciudad" />
                        <input className="border p-1 my-1 text-sm" value={formData.direccionFiscal?.provincia || ''} onChange={e => handleChange("direccionFiscal", "provincia", e.target.value)} placeholder="Provincia" />
                        <input className="border p-1 my-1 text-sm" value={formData.direccionFiscal?.codigoPostal || ''} onChange={e => handleChange("direccionFiscal", "codigoPostal", e.target.value)} placeholder="Código Postal" />
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p className="sm:text-xs md:text-sm font-medium">Calle:</p><p className="sm:text-xs md:text-sm">{member.direccionFiscal?.calle}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Ciudad:</p><p className="sm:text-xs md:text-sm">{member.direccionFiscal?.ciudad}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Provincia:</p><p className="sm:text-xs md:text-sm">{member.direccionFiscal?.provincia}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Código Postal:</p><p className="sm:text-xs md:text-sm">{member.direccionFiscal?.codigoPostal}</p>
                        </div>
                    )}
                </InfoBlock>

            {/* BLOQUE CUOTA */}
            <InfoBlock
                title="Cuota"
                block="cuota"
                editMode={editMode}
                toggleEdit={toggleEdit}
                saveChanges={saveChanges}
                >
                {editMode.cuota ? (
                    <>
                    <label className="sm:text-xs md:text-sm">Pagada: <input type="checkbox" checked={formData.cuota?.pagada || false} onChange={e => handleChange("cuota", "pagada", e.target.checked)} /></label>
                    <input className="border p-1 my-1 sm:text-xs md:text-sm" type="date" value={formData.cuota?.fechaDePago?.split('T')[0] || ''} onChange={e => handleChange("cuota", "fechaDePago", e.target.value)} />
                    <label className="sm:text-xs md:text-sm">Recibí: <input type="checkbox" checked={formData.cuota?.recibi || false} onChange={e => handleChange("cuota", "recibi", e.target.checked)} /></label>
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <p className="sm:text-xs md:text-sm font-medium">Pagada:</p><p className="sm:text-xs md:text-sm">{member.cuota?.pagada ? "Sí" : "No"}</p>
                    <p className="sm:text-xs md:text-sm font-medium">Fecha de pago:</p><p className="sm:text-xs md:text-sm">{member.cuota?.fechaDePago ? new Date(member.cuota.fechaDePago).toLocaleDateString() : "-"}</p>
                    <p className="sm:text-xs md:text-sm font-medium">Recibí:</p><p className="sm:text-xs md:text-sm">{member.cuota?.recibi ? "Sí" : "No"}</p>
                    </div>
                )}
                </InfoBlock>

                {/* BLOQUE ACTIVO */}
                <InfoBlock
                    title="Activo"
                    block="activo"
                    editMode={editMode}
                    toggleEdit={toggleEdit}
                    saveChanges={saveChanges}
                    >
                    {editMode.activo ? (
                        <label className="sm:text-xs md:text-sm"><input type="checkbox" checked={formData.activo || false} onChange={e => handlePrimitiveChange("activo", e.target.checked)} /> Está activo</label>
                    ) : (
                        <span>{member.activo ? "Sí" : "No"}</span>
                    )}
                </InfoBlock>

             {/* BLOQUE COMISIÓN */}
            <InfoBlock
                title="Comisión"
                block="comision"
                editMode={editMode}
                toggleEdit={toggleEdit}
                saveChanges={saveChanges}
                >
                {editMode.comision ? (
                    <>
                    <input className="border p-1 my-1 text-sm" value={formData.comision?.miembro1 || ''} onChange={e => handleChange("comision", "miembro1", e.target.value)} placeholder="Miembro 1" />
                    <input className="border p-1 my-1 text-sm" value={formData.comision?.miembro2 || ''} onChange={e => handleChange("comision", "miembro2", e.target.value)} placeholder="Miembro 2" />
                    <input className="border p-1 my-1 text-sm" value={formData.comision?.miembro3 || ''} onChange={e => handleChange("comision", "miembro3", e.target.value)} placeholder="Miembro 3" />
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p className="sm:text-xs md:text-sm font-medium">Miembro 1:</p>
                        <p className="sm:text-xs md:text-sm break-words overflow-hidden">{member.comision?.miembro1}</p>

                        <p className="sm:text-xs md:text-sm font-medium">Miembro 2:</p>
                        <p className="sm:text-xs md:text-sm break-words overflow-hidden">{member.comision?.miembro2}</p>

                        <p className="sm:text-xs md:text-sm font-medium">Miembro 3:</p>
                        <p className="sm:text-xs md:text-sm break-words overflow-hidden">{member.comision?.miembro3}</p>
                    </div>

                )}
            </InfoBlock>

        {/* BLOQUE OTROS */}
                <InfoBlock
                    title="Otros"
                    block="otros"
                    editMode={editMode}
                    toggleEdit={toggleEdit}
                    saveChanges={saveChanges}

                    >
                    {editMode.otros ? (
                        <>
                        <label className="text-sm"><input type="checkbox" checked={formData.otros?.catalogo || false} onChange={e => handleChange("otros", "catalogo", e.target.checked)} /> Catálogo</label>
                        <label className="text-sm"><input type="checkbox" checked={formData.otros?.directorio || false} onChange={e => handleChange("otros", "directorio", e.target.checked)} /> Directorio</label>
                        <label className="text-sm"><input type="checkbox" checked={formData.otros?.videoFoto || false} onChange={e => handleChange("otros", "videoFoto", e.target.checked)} /> Video/Foto</label>
                        <fieldset className="mt-2">
                            <legend className="text-lg font-medium py-2">Asambleas:</legend>
                            <label className="text-sm"><input type="checkbox" checked={formData.otros?.asamblea?.primera || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, primera: e.target.checked })} /> Primera</label>
                            <label className="text-sm"><input type="checkbox" checked={formData.otros?.asamblea?.segunda || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, segunda: e.target.checked })} /> Segunda</label>
                            <label className="text-sm"><input type="checkbox" checked={formData.otros?.asamblea?.tercera || false} onChange={e => handleChange("otros", "asamblea", { ...formData.otros?.asamblea, tercera: e.target.checked })} /> Tercera</label>
                        </fieldset>
                        </>
                    ) : (
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p className="sm:text-xs md:text-sm font-medium">Catálogo:</p><p className="sm:text-xs md:text-sm">{member.otros?.catalogo ? "Sí" : "No"}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Directorio:</p><p className="sm:text-xs md:text-sm">{member.otros?.directorio ? "Sí" : "No"}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Video/Foto:</p><p className="sm:text-xs md:text-sm">{member.otros?.videoFoto ? "Sí" : "No"}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Asamblea 1:</p><p className="sm:text-xs md:text-sm">{member.otros?.asamblea?.primera ? "Sí" : "No"}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Asamblea 2:</p><p className="sm:text-xs md:text-sm">{member.otros?.asamblea?.segunda ? "Sí" : "No"}</p>
                        <p className="sm:text-xs md:text-sm font-medium">Asamblea 3:</p><p className="sm:text-xs md:text-sm">{member.otros?.asamblea?.tercera ? "Sí" : "No"}</p>
                        </ul>
                    )}
                </InfoBlock>

        </ul>
        </div>
  </>

}
