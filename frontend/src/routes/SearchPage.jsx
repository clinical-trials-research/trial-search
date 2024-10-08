import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Trial from "../components/Trial";

/**
 * Represents the main page where users can search and display clinical trials.
 */
export default function SearchPage() {
  let [trials, setTrials] = useState([]);
  let [loading, setLoading] = useState(false);

  async function handleSearch(query, neighbors) {
    setLoading(true);
    let response = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, neighbors }),
    });
    let data = await response.json();
    let { ids, distances, metadatas } = data;

    // We only have 1 query result, but ChromaDB returns a list of results
    // for each query.
    ids = ids[0];
    distances = distances[0];
    metadatas = metadatas[0];

    let newTrials = [];
    for (let i = 0; i < ids.length; i++) {
      newTrials.push({
        nctid: ids[i],
        metadata: metadatas[i],
        distance: distances[i],
      });
    }

    setTrials(newTrials);
    setLoading(false);
  }

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className="flex flex-col items-center">
        {loading && <p>Loading...</p>}
        {trials.map(({ nctid, metadata, distance }, index) => (
          <Trial
            key={index}
            nctid={nctid}
            metadata={metadata}
            distance={distance}
          />
        ))}
      </div>
    </div>
  );
}
