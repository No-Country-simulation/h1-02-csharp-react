import { useRef } from "react";
import PatientStudiesTable from "../PatientStudiesTable/PatientStudiesTable";
import { FormIcon, PlusIcon } from "../icons";

export default function PatientStudiesSection() {
  const ref = useRef();
  return (
    <section className="w-full flex flex-col gap-y-4 justify-start mt-10 max-w-[790px]">
      <div className="flex justify-between text-primary font-bold">
        <h2 className="text-titulopag flex gap-x-4">
          <FormIcon />
          Mis estudios
        </h2>
        <button
          ref={ref}
          className="rounded-[32px] bg-rose-o20 shadow-glass-effect p-2 flex justify-center items-center gap-x-2"
          onClick={() => {}}
        >
          Cargar nuevo estudio{" "}
          <span className="scale-[1] bg-rose-o40 rounded-md p-1">
            <PlusIcon />
          </span>
        </button>
      </div>
      <PatientStudiesTable />
    </section>
  );
}
