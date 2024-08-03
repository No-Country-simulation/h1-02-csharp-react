import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar";

const MedicalCenterSearchBar = () => (
  <div className="flex flex-col justify-center items-center gap-y-3 w-full max-w-[768px]">
    <h2 className="text-neutrals600 font-bold">Busca un medico *</h2>
    <DrHomeSearchBar />
  </div>
);

export default MedicalCenterSearchBar;
