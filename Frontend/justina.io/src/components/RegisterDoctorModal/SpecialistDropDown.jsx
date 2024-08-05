import { useState } from "react";
import Show from "../Show/Show";
import FormInput from "../FormInput/FormInput";

const SpecilistItem = ({ click, description }) => (
  <div
    className="p-2 select-none cursor-pointer first:rounded-t-[32px] last:rounded-b-[16px] hover:bg-[#fcf0f0]"
    onClick={click}
  >
    {description}
  </div>
);

export default function SpecialistDropDown({
  specialities,
  setValue,
  selected,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <label className="block text-parrafo font-bold text-neutrals600 ">
        Especialidad *
      </label>
      <div
        className="relative flex w-full h-full min-w-[220px] cursor-pointer z-30"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <FormInput
          id="specialitiesIds"
          inputStyle="w-full -z-20 select-none relative"
          labelStyle="text-neutrals800"
          value={selected ? selected.description : "Seleccione la especialidad"}
          readOnly={true}
        />
        <div
          className={`absolute left-0 bg-[#fafafa] w-[200px] group rounded-[16px] z-20 transition-all duration-200 ${
            open ? "h-auto top-[100%] opacity-100" : "h-0 top-[80%] opacity-0"
          } `}
        >
          <Show when={open}>
            <div className="w-auto h-auto">
              {specialities.map((specialist) => (
                <SpecilistItem
                  key={specialist.id}
                  click={(e) => {
                    e.stopPropagation();
                    setValue(specialist);
                    setOpen((_) => false);
                  }}
                  description={specialist.description}
                />
              ))}
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
