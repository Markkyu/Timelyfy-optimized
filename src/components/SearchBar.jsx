// components/SearchBar.jsx
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <section className="flex items-center border border-gray-600 rounded-full p-1">
      <input
        type="text"
        placeholder="Search..."
        className="w-100 outline-none px-5"
        value={value}
        onChange={onChange}
      />
      <SearchIcon className="text-gray-700 mr-2" />
    </section>
  );
}
