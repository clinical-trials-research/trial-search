import linkIconUrl from "../assets/link-icon.png";

/**
 * Trial component visualizes a clinical trial document.
 */
export default function Trial({ nctid, document, distance }) {
  return (
    <div className="my-2 w-11/12 rounded-3xl bg-gray-50 p-5 md:w-9/12 lg:w-7/12">
      <div className="flex justify-between">
        <p className="inline font-bold">{nctid}</p>
        <p className="inline font-bold">{Math.round(distance)}</p>
      </div>
      <p>{document}</p>
      <div className="flex flex-row-reverse">
        <a href={`https://clinicaltrials.gov/study/${nctid}`} target="_blank">
          <img className="w-4" src={linkIconUrl} alt="Link Icon" />
        </a>
      </div>
    </div>
  );
}
