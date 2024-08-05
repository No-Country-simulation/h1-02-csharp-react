import chevronDown from '../../assets/icons/chevronDown.svg'

export default function SelectList({
  id,
  name,
  options = [],
  value,
  onChange,
  height = "h-[52px]",
  labelStyle,
  readOnly = false,
  selectStyle = "",
}) {
  return (
    <div className="mb-1 w-full">
      <label
        className={`block mb-2 text-parrafo font-bold text-neutrals600 ${labelStyle}`}
        htmlFor={id}
      >
        {name}
      </label>
      <div className="relative">       
        <select
          className={`backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom appearance-none rounded-3xl text-neutrals600 w-full p-3 leading-tight text-[0.8rem] lg:text-[1rem] outline-none ${selectStyle} ${height}`}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={readOnly}
          readOnly={readOnly}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <img
          className="absolute inset-y-6 right-3 pointer-events-none"
          src={chevronDown}
          alt="Dropdown arrow"
        />
      </div>
    </div>
  );
}
