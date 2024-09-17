import { Link } from "react-router-dom";

/**
 * Trial component visualizes a clinical trial document.
 */
export default function Trial({ nctid, document, distance }) {
  return (
    <Link
      className="my-2 w-11/12 rounded-3xl bg-gray-50 p-5 hover:cursor-pointer md:w-9/12 lg:w-7/12"
      to={`/trial/${nctid}`}
    >
      <div className="flex justify-between">
        <p className="inline font-bold">{nctid}</p>
        <p className="inline font-bold">{Math.round(distance)}</p>
      </div>
      <p>{document}</p>
    </Link>
  );
}
