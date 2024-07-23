export default function FormInput ({ id, name, type, placeholder, value, onChange, height }) {
   
    return (
      <div className='mb-1 w-full'>
        <label
          className='block mb-2 text-parrafo font-bold text-neutrals600'
          htmlFor={id}
        >
          {name}
        </label>
        <input
          className={`backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom appearance-none rounded-3xl w-full p-3 leading-tight text-[0.8rem] lg:text-[1rem] outline-none ${height ? height : 'h-[52px]'}`} 
          id={id}
          type={type}
          placeholder={placeholder}
          name={id}
          value={value || ''}
          onChange={onChange}         
        />        
      </div>
    )
  }