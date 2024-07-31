import FormInput from "../../components/FormInput/FormInput";

const DrHome = () => {
  return (
    <section className="flex justify-center items-start w-full h-full">
      <div className="p-3 flex flex-col justify-center items-center max-w-[85%] pt-16 gap-y-3 min-[840px]:min-w-[590px]">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <h2 className="heading-2">Encuentra a tu paciente</h2>
          <h3 className="heading-1">Ingrese su CUIL o DNI</h3>
        </div>
        <FormInput
          id="searcher"
          type="text"
          placeholder="Ejem. 20453409113..."
          autoComplete="off"
        />
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default DrHome;
