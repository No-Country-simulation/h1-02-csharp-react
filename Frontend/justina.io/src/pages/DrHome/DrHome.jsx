import FormInput from "../../components/FormInput/FormInput";
import { SearchIcon } from "../../components/icons";

const DrHome = () => {
  return (
    <section className="flex justify-center items-start w-full h-full">
      <div className="p-3 flex flex-col justify-center items-center max-w-[85%] pt-16 gap-y-3 min-[840px]:min-w-[590px]">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <h2 className="heading-2">Encuentra a tu paciente</h2>
          <h3 className="heading-1">Ingrese su CUIL o DNI</h3>
        </div>
        <div className="w-full h-full relative contain-inline-size">
          <FormInput
            id="searcher"
            type="text"
            placeholder="Ejem. 20453409113..."
            autoComplete="off"
          />
          <button
            className="absolute right-0 top-[50%] rounded-full p-1 -translate-y-1/2 bg-rose-o10 shadow-glass-effect flex justify-center items-center w-12 h-[75%]"
            onClick={() => alert("Not implemented")}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default DrHome;
