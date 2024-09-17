import { useLoaderData } from "react-router-dom";

export default function TrialPage() {
  let { trialData } = useLoaderData();
  let { nctId, briefTitle, officialTitle } =
    trialData.protocolSection.identificationModule;

  return (
    <div>
      <p>{nctId}</p>
      <p>{briefTitle}</p>
      <p>{officialTitle}</p>
    </div>
  );
}

/**
 * Retrieves trial information from Clinical Trials API.
 */
export async function loader({ params }) {
  try {
    let response = await fetch(
      `https://clinicaltrials.gov/api/v2/studies/${params.nctid}`,
    );
    let trialData = await response.json();
    return { trialData };
  } catch (error) {
    console.log(error);
  }
}
