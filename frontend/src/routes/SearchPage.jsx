import { useState } from "react";
import Trial from "../components/Trial";

export default function SearchPage() {
  let [queryText, setQueryText] = useState("");
  let [trials, setTrials] = useState([]);
  let [loading, setLoading] = useState(false);

  async function updateSearchResults(queryText) {
    setLoading(true);
    let response = await fetch("http://localhost:8001/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryText }),
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
      <div className="my-6">
        <input
          className="mr-2 rounded border-2 border-slate-400 p-1"
          type="text"
          value={queryText}
          onInput={e => setQueryText(e.target.value)}
        />
        <button
          className="rounded bg-slate-300 p-2"
          onClick={() => updateSearchResults(queryText)}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {trials.map(({ nctid, document }, index) => (
        <Trial key={index} nctid={nctid} document={document} />
      ))}
    </div>
  );
}
