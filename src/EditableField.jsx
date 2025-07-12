import { useState } from "react";


// Componente reutilizable para campos editables
export default function EditableField({ label, value, onSave, type = "text", options = [] }) {
  const [editing, setEditing] = useState(false);
  const [temporaryValue, setTemporaryValue] = useState(value);

  // Función para guardar el nuevo valor y salir del modo edición
  const handleSave = () => {
    if (temporaryValue !== value) {
      onSave(temporaryValue);
    }
    setEditing(false);
  };

  return (
    <div className="mb-2">
      <strong>{label}:</strong>{" "}
      
      {/* Si está en modo edición, mostrar el input correspondiente */}
      { editing ? (
        <>
          {type === "select" ? (
            <select
              value={temporaryValue}
              onChange={ (e) => setTemporaryValue(e.target.value) }
              className="border px-1"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : type === "checkbox" ? (
            <input
              type="checkbox"
              checked={temporaryValue}
              onChange={ (e) => setTemporaryValue(e.target.checked) }
            />
          ) : (
            <input
              type={type}
              value={temporaryValue}
              onChange={ (e) => setTemporaryValue(e.target.value) }
              className="border px-1"
            />
          )}
          <button onClick={handleSave} className="ml-2 text-green-700">Guardar</button>
          <button onClick={() => setEditing(false)} className="ml-2 text-red-700">Cancelar</button>
        </>
      ) : (
        <>
          <span>{type === "checkbox" ? (value ? "Sí" : "No") : value || "-"}</span>
          <button onClick={() => setEditing(true)} className="ml-2 text-blue-700">Editar</button>
        </>
      )}
    </div>
  );
}