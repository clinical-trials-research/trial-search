from pathlib import Path
from typing import Generator

import chromadb
import httpx
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from tqdm import tqdm

STUDIES_API = "https://clinicaltrials.gov/api/v2/studies"
STUDY_SIZES_API = "https://clinicaltrials.gov/api/v2/stats/size"

# Create database directory if it doesn't exist.
Path("./datbase").mkdir(exist_ok=True)


def get_num_studies() -> int:
    """
    Return the number of clinical trial studies available.

    Returns:
        int: Total number of studies.
    """
    response = httpx.get(STUDY_SIZES_API)
    response.raise_for_status()
    return response.json()["totalStudies"]


def get_studies_generator(num_studies=1000) -> Generator:
    """
    Create a generator that yields batches of clinical trials. The number
    of trials is specified in the constructor as num_studies.

    Args:
        num_studies (int): The number of studies to retriever per call.

    Yields:
        Generator: Yields a list of clinical trials.
    """

    # Only query for NCTId and BriefSummary fields.
    params = {"pageSize": str(num_studies), "fields": "NCTId|BriefSummary"}

    with httpx.Client() as client:
        response = client.get(STUDIES_API, params=params)
        response.raise_for_status()
        data = response.json()
        next_page_token = data.get("nextPageToken")

        while next_page_token:
            yield data.get("studies", [])
            params["pageToken"] = next_page_token
            response = client.get(STUDIES_API, params=params)
            response.raise_for_status()
            data = response.json()
            next_page_token = data.get("nextPageToken")


chroma_client = chromadb.PersistentClient(path="./database")
chroma_collection = chroma_client.get_or_create_collection(
    name="trials",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="neuml/pubmedbert-base-embeddings"
    ),
    metadata={"hnsw:space": "cosine"},
)

num_studies = get_num_studies()
studies_generator = get_studies_generator()
for batch in tqdm(studies_generator, total=num_studies // 1000):
    ids = []
    documents = []
    metadatas = []

    for study in batch:
        protocol_section = study["protocolSection"]
        nctid = protocol_section["identificationModule"]["nctId"]
        brief_title = protocol_section["identificationModule"].get("briefTitle", "")
        official_title = protocol_section["identificationModule"].get(
            "officialTitle", ""
        )
        brief_summary = protocol_section.get("descriptionModule", {}).get(
            "briefSummary", ""
        )
        detailed_description = protocol_section.get("descriptionModule", {}).get(
            "detailedDescription", ""
        )
        eligibility_criteria = protocol_section.get("eligibilityModule", {}).get(
            "eligibilityCriteria", ""
        )

        ids.append(nctid)
        documents.append(
            f"{brief_title} {official_title} {brief_summary} {detailed_description}"
        )
        metadatas.append(
            {
                "brief_title": brief_title,
                "official_title": official_title,
                "brief_summary": brief_summary,
                "detailed_description": detailed_description,
                "eligibility_criteria": eligibility_criteria,
            }
        )

    chroma_collection.add(ids=ids, documents=documents, metadatas=metadatas)

print("Finished updating ChromaDB!")
