const TextAreaInput = ({ name, placeholder, id, value, onChange, height, readOnly = false }) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className="block mb-2 text-parrafo font-bold text-neutrals600">{name}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
        className={`backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom text-neutrals600 text-parrafo rounded-3xl block w-full p-3 outline-none resize-none ${height}`}
      />
    </div>
  )
}

export default TextAreaInput
