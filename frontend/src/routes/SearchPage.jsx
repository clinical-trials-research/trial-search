import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Trial from "../components/Trial";

export default function SearchPage() {
  let [trials, setTrials] = useState([]);
  let [loading, setLoading] = useState(false);

  async function handleSearch(query) {
    setLoading(true);
    let response = await fetch("http://localhost:8001/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    });
    let { ids, documents } = await response.json();

    // We only have 1 query result, but ChromaDB returns a list of results
    // for each query.
    ids = ids[0];
    documents = documents[0];

    let newTrials = [];
    for (let i = 0; i < ids.length; i++) {
      newTrials.push({ nctid: ids[i], document: documents[i] });
    }

    setTrials(newTrials);
    setLoading(false);
  }

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />

      <div className="flex flex-col items-center">
        {loading && <p>Loading...</p>}
        {trials.map(({ nctid, document }, index) => (
          <Trial key={index} nctid={nctid} document={document} />
        ))}
      </div>
    </div>
  );
}
