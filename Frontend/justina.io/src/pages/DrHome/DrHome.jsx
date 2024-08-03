import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar";
import CardPreviewPacient from "../../components/CardPreviewPacient/CardPreviewPacient";

const DrHome = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-3 flex flex-col justify-center items-center max-w-[85%] pt-16 gap-y-6 min-[840px]:min-w-[590px] mb-4">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <h2 className="heading-2">Encuentra a tu paciente</h2>
          <h3 className="heading-1">Ingrese su CUIL</h3>
        </div>
        <DrHomeSearchBar />
      </div>
      <CardPreviewPacient />
    </section>
  );
};

export default DrHome;
