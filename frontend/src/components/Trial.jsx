/**
 * Trial component visualizes a clinical trial document.
 */
export default function Trial({ nctid, document }) {
  return (
    <div className="my-4">
      <h2 className="font-bold">{nctid}</h2>
      <p>{document}</p>
    </div>
  );
}
