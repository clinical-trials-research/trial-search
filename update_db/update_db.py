import time
from typing import Generator

import chromadb
import httpx
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from tqdm import tqdm

STUDIES_API = "https://clinicaltrials.gov/api/v2/studies"


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


if __name__ == "__main__":
    chroma_client = chromadb.HttpClient(host="host.docker.internal", port=8000)
    chroma_collection = chroma_client.get_or_create_collection(
        name="trials",
        embedding_function=SentenceTransformerEmbeddingFunction(
            model_name="neuml/pubmedbert-base-embeddings"
        ),
    )

    # Update database if it's empty.
    if chroma_collection.count() == 0:
        studies_generator = get_studies_generator()
        for batch in tqdm(next(studies_generator, [])):
            ids = []
            documents = []
            for study in batch:
                ids.append(study["protocolSection"]["identificationModule"]["nctId"])
                documents.append(
                    study["protocolSection"]["descriptionModule"]["briefSummary"]
                )
            chroma_collection.add(ids=ids, documents=documents)
    print("Finished updating ChromaDB!")
