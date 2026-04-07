import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/usersSlice";
import { Search } from "lucide-react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.users.searchQuery);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="relative w-full md:w-96">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
      <Search className="absolute left-3 top-5 text-gray-400" size={18} />
      <input
        type="search"
        className="block w-full rounded-2xl border border-gray-300 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-md transition outline-none"
        placeholder="Filter users by name..."
        value={searchQuery}
        onChange={handleSearchChange}
        required
      />
    </div>
  );
}
