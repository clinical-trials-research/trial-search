import { useRef, useState } from "react";
import linkIconUrl from "../assets/link-icon.png";

/**
 * Trial component visualizes a clinical trial document.
 */
export default function Trial({ nctid, metadata, distance }) {
  let [expanded, setExpanded] = useState(false);
  let contentRef = useRef();
  let {
    brief_title: briefTitle,
    official_title: officialTitle,
    brief_summary: briefSummary,
    detailed_description: detailedDescription,
    eligibility_criteria: elgibilityCriteria,
  } = metadata;

  return (
    <div
      className="my-2 w-11/12 cursor-pointer rounded-3xl bg-gray-50 p-5 md:w-9/12 lg:w-7/12"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between">
        <h1 className="inline text-lg font-bold">
          {briefTitle} ({nctid})
        </h1>
        <p className="inline font-bold">{parseFloat(distance).toFixed(2)}</p>
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-500"
      >
        <h2 className="mt-2 font-bold">Official Title</h2>
        <p>{officialTitle}</p>

        <h2 className="mt-2 font-bold">Brief Summary</h2>
        <p>{briefSummary}</p>

        {detailedDescription && (
          <h2 className="mt-2 font-bold">Detailed Description</h2>
        )}
        <p>{detailedDescription}</p>

        <h2 className="mt-2 font-bold">Eligibility Criteria</h2>
        <p>{elgibilityCriteria}</p>

        <div className="flex flex-row-reverse">
          <a href={`https://clinicaltrials.gov/study/${nctid}`} target="_blank">
            <img className="w-4" src={linkIconUrl} alt="Link Icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
