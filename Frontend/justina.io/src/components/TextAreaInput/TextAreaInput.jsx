const TextAreaInput = ({ name, placeholder, id, value, onChange, height }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-parrafo font-bold text-neutrals600">{name}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom text-neutrals600 text-parrafo rounded-3xl block w-full p-3 outline-none resize-none ${height}`}
      />
    </div>
  )
}

export default TextAreaInput
