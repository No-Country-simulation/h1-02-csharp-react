export default function FormInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  height,
  icon,
  labelStyle,
  autoComplete,
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
        {icon && (
          <img
            className="absolute inset-y-3.5 left-0 flex items-center pl-3 pointer-events-none"
            src={icon}
          />
        )}
        <input
          className={`backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom appearance-none rounded-3xl text-neutrals600 w-full p-3 leading-tight text-[0.8rem] lg:text-[1rem] outline-none ${
            height ? height : "h-[52px]"
          } ${icon ? "pl-10" : ""}`}
          id={id}
          type={type}
          placeholder={placeholder}
          name={id}
          value={value || ""}
          onChange={onChange}
          autoComplete={autoComplete || ""}
        />
      </div>
    </div>
  );
}
