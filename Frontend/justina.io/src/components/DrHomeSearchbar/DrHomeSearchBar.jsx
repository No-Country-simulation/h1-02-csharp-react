import { useSearchParams } from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import { SearchIcon } from "../icons";
import css from "./drhomesearchbar.module.css";
import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";

export default function DrHomeSearchBar({
  placeHodler = "",
  onClick = () => alert("Not implemented"),
}) {
  const [params, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(params.get("search")?.toString() || "");

  const handleSearch = useDebounce((value) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  }, 300);
  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
    handleSearch(value);
  };

  return (
    <div className={css.searchBarContainer}>
      <FormInput
        id="searcher"
        type="text"
        placeholder={placeHodler}
        onChange={handleInput}
        value={input || ""}
      />
      <button
        className="absolute right-[2px] top-[48%] rounded-full p-1 -translate-y-1/2 bg-rose-o10 shadow-glass-effect flex justify-center items-center w-12 h-[78%]"
        onClick={onClick}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
