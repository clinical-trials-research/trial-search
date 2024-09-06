/**
 * The about page gives information about the website.
 */
export default function AboutPage() {
  return (
    <div className="w-11/12 rounded-3xl bg-gray-50 p-5 md:w-8/12 lg:w-5/12">
      <p>
        This website enables semantic search of clinical trials. The backend
        leverages ChromaDB to store vector embeddings of clinical trials, using
        PubBERT to embed the BriefSummary field. The backend is hosted with
        Flask and Gunicorn, while the frontend is built using React.
      </p>
      <p className="my-3">
        See the GitHub{" "}
        <a
          className="text-blue-600 hover:underline"
          href="https://github.com/clinical-trials-research/trial-search"
        >
          repository.
        </a>
      </p>
    </div>
  );
}
