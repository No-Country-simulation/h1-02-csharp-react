import FormInput from "../FormInput/FormInput";
import { SearchIcon } from "../icons";
import css from "./drhomesearchbar.module.css";

export default function DrHomeSearchBar() {
  return (
    <div className={css.searchBarContainer}>
      <FormInput
        id="searcher"
        type="text"
        placeholder="Ejem. 20453409113..."
        autoComplete="off"
      />
      <button
        className="absolute right-[2px] top-[48%] rounded-full p-1 -translate-y-1/2 bg-rose-o10 shadow-glass-effect flex justify-center items-center w-12 h-[78%]"
        onClick={() => alert("Not implemented")}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
