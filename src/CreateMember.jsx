import { useState, useContext } from "react";
import Context from "./Context";
import { useNavigate } from "react-router-dom";

export default function CreateMember() {
  const { token } = useContext(Context);
  const navigate = useNavigate();

  // Estado inicial con la estructura completa del socio
  const [form, setForm] = useState({
    nombreEntidad: "",
    tipoSocio: [],
    status: "activo",
    antiguedad: "",
    provincia: "",
    clave: "",
    genero: "",
    contacto: {
      tlfnMovil: "",
      fijo: "",
      email1: "",
      email2: ""
    },
    razonSocial: "",
    direccionFiscal: {
      calle: "",
      ciudad: "",
      provincia: "",
      codigoPostal: ""
    },
    cuota: {
      pagada: false,
      fechaDePago: "",
      recibi: false
    },
    activo: true,
    comision: {
      miembro1: "",
      miembro2: "",
      miembro3: ""
    },
    otros: {
      catalogo: false,
      directorio: false,
      videoFoto: false,
      asamblea: {
        primera: false,
        segunda: false,
        tercera: false
      }
    },
    notas: [{ nota: "" }]
  });

  // Manejar cambios de campos planos y anidados
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [objKey, subKey, thirdKey] = name.split(".");
      setForm(prev => ({
        ...prev,
        [objKey]: thirdKey
          ? {
              ...prev[objKey],
              [subKey]: {
                ...prev[objKey][subKey],
                [thirdKey]: type === "checkbox" ? checked : value
              }
            }
          : {
              ...prev[objKey],
              [subKey]: type === "checkbox" ? checked : value
            }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  }

  // Manejar notas (array)
  function handleArrayChange(e, index) {
    const { value } = e.target;
    const newNotas = [...form.notas];
    newNotas[index].nota = value;
    setForm(prev => ({ ...prev, notas: newNotas }));
  }

  // Añadir o quitar tipos de socio (checkbox múltiples)
  function handleTipoChange(e) {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      tipoSocio: checked
        ? [...prev.tipoSocio, value]
        : prev.tipoSocio.filter(t => t !== value)
    }));
  }

  // Enviar formulario al backend
  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://gestiondesocios-backend.onrender.com/members/new", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        if (response.ok) navigate("/dashboard/members");
        else alert("Error al crear socio");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  return <>
        <form onSubmit={handleSubmit} className="p-4 space-y-4 flex flex-col w-[680px] mx-[50px]">
            <h2 className="text-3xl dark font-bold pb-2 pt-6">Crear nuevo socio</h2>

            <input name="nombreEntidad" placeholder="Nombre de la entidad" value={form.nombreEntidad} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" required />

            <fieldset className="mb-4">
                <legend className="text-lg dark font-bold pb-2 pt-6 mb-2">Tipo de socio</legend>
                {["Compañía", "Distribuidora", "Festival", "Otro"].map(tipo => (
                    <label key={tipo} className="block text-sm">
                    <input
                        type="radio"
                        name="tipoSocio"
                        value={tipo}
                        checked={form.tipoSocio === tipo}
                        onChange={e => setForm({ ...form, tipoSocio: e.target.value })}
                        className="mr-2"
                    />
                    {tipo}
                    </label>
                ))}
            </fieldset>
            <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm">
                {["interesado", "ex-socio", "activo"].map(s => (
                <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <input name="antiguedad" placeholder="Antigüedad" value={form.antiguedad} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />

            <input name="provincia" placeholder="Provincia" value={form.provincia} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" required />

            <input name="clave" placeholder="Clave" value={form.clave} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />

            <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />

            {/* Contacto */}
            <fieldset className="flex flex-col gap-4">
                <legend className="text-lg dark font-bold pb-2 pt-6 mb-2">Contacto</legend>
                <input name="contacto.tlfnMovil" placeholder="Móvil" value={form.contacto.tlfnMovil} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="contacto.fijo" placeholder="Fijo" value={form.contacto.fijo} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="contacto.email1" placeholder="Email 1" value={form.contacto.email1} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="contacto.email2" placeholder="Email 2" value={form.contacto.email2} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
            </fieldset>

            <input name="razonSocial" placeholder="Razón Social" value={form.razonSocial} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />

            {/* Dirección fiscal */}
            <fieldset className="flex flex-col gap-4">
                <legend className="text-lg dark font-bold pb-2 pt-6 mb-2">Dirección Fiscal</legend>
                <input name="direccionFiscal.calle" placeholder="Calle" value={form.direccionFiscal.calle} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="direccionFiscal.ciudad" placeholder="Ciudad" value={form.direccionFiscal.ciudad} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="direccionFiscal.provincia" placeholder="Provincia" value={form.direccionFiscal.provincia} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="direccionFiscal.codigoPostal" placeholder="Código Postal" value={form.direccionFiscal.codigoPostal} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
            </fieldset>

            {/* Cuota */}
            <fieldset className="flex flex-col gap-4 border rounded p-2">
                <legend className="text-lg dark font-bold pb-2 pt-6">Cuota</legend>
                <label className="text-sm">
                  <input type="checkbox" name="cuota.pagada" checked={form.cuota.pagada} onChange={handleChange} /> Pagada
                </label>
                <input type="date" name="cuota.fechaDePago" value={form.cuota.fechaDePago} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <label className="text-sm">
                <input type="checkbox" name="cuota.recibi" checked={form.cuota.recibi} onChange={handleChange} /> Recibí justificante
                </label>
            </fieldset>

            {/* Estado activo */}
            <label className="border p-2 text-lg dark rounded-sm">
                <input className="mr-3"  type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />Socio activo
            </label>

            {/* Comisión */}
            <fieldset className="flex flex-col gap-4">
                <legend className="text-lg dark font-bold pb-2 pt-6">Comisión</legend>
                <input name="comision.miembro1" placeholder="Miembro 1" value={form.comision.miembro1} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="comision.miembro2" placeholder="Miembro 2" value={form.comision.miembro2} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
                <input name="comision.miembro3" placeholder="Miembro 3" value={form.comision.miembro3} onChange={handleChange} className="border p-2 rounded-sm w-full text-sm" />
            </fieldset>

            {/* Otros */}
            <fieldset className="flex flex-col">
                  <legend className="text-lg dark font-bold pb-2 pt-6">Otros</legend>
                  <label className="text-sm"><input type="checkbox" name="otros.catalogo" checked={form.otros.catalogo} onChange={handleChange} /> Catálogo</label>
                  <label className="text-sm"><input type="checkbox" name="otros.directorio" checked={form.otros.directorio} onChange={handleChange} /> Directorio</label>
                  <label className="text-sm"><input type="checkbox" name="otros.videoFoto" checked={form.otros.videoFoto} onChange={handleChange} /> Video/Foto</label>
            </fieldset>
            <fieldset className="flex flex-col">
                  <legend className="text-lg dark font-bold pb-2 pt-6">Asamblea</legend>
                  <label className="text-sm"><input type="checkbox" name="otros.asamblea.primera" checked={form.otros.asamblea.primera} onChange={handleChange} /> Primera</label>
                  <label className="text-sm"><input type="checkbox" name="otros.asamblea.segunda" checked={form.otros.asamblea.segunda} onChange={handleChange} /> Segunda</label>
                  <label className="text-sm"><input type="checkbox" name="otros.asamblea.tercera" checked={form.otros.asamblea.tercera} onChange={handleChange} /> Tercera</label>
            </fieldset>

            {/* Notas */}
            <fieldset>
                <legend className="text-lg dark font-bold pb-2 pt-6">Notas</legend>
                {form.notas.map((n, i) => (
                <input
                    key={i}
                    value={n.nota}
                    onChange={e => handleArrayChange(e, i)}
                    placeholder={`Nota ${i + 1}`}
                    className="border p-2 rounded-sm w-full"
                />
                ))}
            </fieldset>

            <input type="submit" value="Guardar socio" className="red-400 bg-hover-custom-blue-400 text-white px-4 py-2 rounded lg:w-50 w-full self-end" />
        </form>
        </>
}