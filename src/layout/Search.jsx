import { SearchIcon } from "@/icons/NavbarIcons";

const Search = () => {
  return (
    <div className="relative w-full">
      <input type="search" id="search-input" placeholder="Search"
        className="peer/search bg-secondryBg font-chirp text-15 focus:bg-primaryBg focus:ring-accent border-1 w-full rounded-full py-2.5 pl-10 pr-1.5 focus:ring-2"
      />
      <label htmlFor="search-input" className="peer-focus/search:*:fill-accent absolute left-3.5 top-1/2 -translate-y-1/2">
        <SearchIcon className="fill-secondryTxt size-[18px]" />
      </label>
    </div>
  );
};

export default Search;
