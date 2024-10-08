import { useState } from "react";

/**
 * SearchBar is a component which is used to search for clinical trials.
 */
export default function SearchBar({ handleSearch }) {
  let [query, setQuery] = useState("");
  let [neighbors, setNeighbors] = useState(10);

  return (
    <form
      className="my-4 text-center"
      onSubmit={e => {
        e.preventDefault();
        handleSearch(query, neighbors);
      }}
    >
      <input
        className="w-9/12 rounded-3xl p-4 md:w-8/12 lg:w-1/2"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="relative right-8" type="submit">
        <img
          className="opacity-60 hover:opacity-80"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E"
        />
      </button>
      <div className="mt-3 inline-flex flex-col justify-center sm:m-0">
        <input
          className="w-32"
          type="range"
          min={1}
          max={50}
          value={neighbors}
          onChange={e => setNeighbors(parseInt(e.target.value))}
        />
        <p>Results: {neighbors}</p>
      </div>
    </form>
  );
}
