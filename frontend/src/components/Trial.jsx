/**
 * Trial component visualizes a clinical trial document.
 */
export default function Trial({ nctid, document }) {
  return (
    <div className="my-4 w-11/12 md:w-9/12 lg:w-7/12">
      <h2 className="font-bold">{nctid}</h2>
      <p>{document}</p>
    </div>
  );
}
