export default function FormInput ({ id, name, type, placeholder, value, onChange }) {
   
    return (
      <div className='mb-1 h-[90px] w-full'>
        <label
          className='block text-sm mb-2'
          htmlFor={id}
        >
          {name}
        </label>
        <input
          className='shadow appearance-none border rounded w-full border-gray-800 py-3 px-3 leading-tight text-[0.8rem] lg:text-[1rem]'
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