import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, toggleSortOrder } from "../store/usersSlice";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error, searchQuery, sortOrder } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const filteredAndSortedUsers = useMemo(() => {
    let result = users.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [users, searchQuery, sortOrder]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <SearchBar />

        <button
          onClick={() => dispatch(toggleSortOrder())}
          className="flex items-center gap-2 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 transition duration-200 ring-1 ring-inset ring-indigo-200"
        >
          Sort by Name
          {sortOrder === "asc" ? (
            <ArrowUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ArrowDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-500 font-medium">
            Loading amazing users...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-100 shadow-sm max-w-2xl mx-auto">
          <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
          <h3 className="mt-2 text-lg font-bold text-red-800">
            Something went wrong
          </h3>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            onClick={() => dispatch(fetchUsersAsync())}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* List / Empty State */}
      {!loading && !error && (
        <>
          {filteredAndSortedUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {filteredAndSortedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-gray-100 p-6">
                <svg
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No users found
              </h3>
              <p className="mt-2 text-gray-500">
                We couldn't find anyone matching "{searchQuery}"
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
