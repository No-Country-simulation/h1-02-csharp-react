export default function FormInputDisabled ({ id, name, type, placeholder, value, onChange }) {
   
    return (
      <div className='mb-1 h-[90px] w-full'>
        <label
          className='block text-sm mb-2'
          htmlFor={id}
        >
          {name}
        </label>
        <input
          disabled
          className='rounded-[32px] shadow-suave
          appearance-none border w-full py-3 px-3 leading-tight text-[0.8rem] lg:text-[1rem]'
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