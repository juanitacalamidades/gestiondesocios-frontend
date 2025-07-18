export default function InfoBlock({
  title,
  block,
  editMode,
  toggleEdit,
  saveChanges,
  children
}) {
  return (
    <li className={`oro-data grow flex flex-col max-h-max space-y-6 relative border border-black rounded-[6px] p-4 border border-color bg-[#E6E4D9]`}>
      {title && <h2 className="mb-4 text-lg font-bold dark">{title}</h2>}

      {children}

      {editMode[block] ? (
        <button
          onClick={() => saveChanges(block, block !== "general" && block !== "activo" ? true : false)}
          className="bg-[#31234E] text-sm light px-4 py-2 py-1 my-4 rounded bg-hover-custom-red-400"
        >Guardar
        </button>
      ) : (
        <svg
          onClick={() => toggleEdit(block)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 self-end cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      )}
    </li>
  )
}
