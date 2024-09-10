import time
from typing import Generator

import chromadb
import httpx
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from flask import Flask, request
from flask_cors import CORS
from tqdm import tqdm

STUDIES_API = "https://clinicaltrials.gov/api/v2/studies"
STUDY_SIZES_API = "https://clinicaltrials.gov/api/v2/stats/size"

app = Flask(__name__)
CORS(app)


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


# Wait for ChromoDB container to start first.
time.sleep(5)

# Initialize the database client and connect it to the database hosted on port
# 8000 as specified in compose.yaml. Since both containers are in the same
# network, we can communicate via HTTP by sepcifying the hostname as the
# container name of the database, which is "trial-search-chromadb".
chroma_client = chromadb.HttpClient(host="chromadb", port=8000)
chroma_collection = chroma_client.get_or_create_collection(
    name="trials",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="neuml/pubmedbert-base-embeddings"
    ),
)


# Update database if it's empty.
num_studies = get_num_studies()
studies_generator = get_studies_generator()
for batch in tqdm(studies_generator, total=num_studies // 1000):
    ids = []
    documents = []
    for study in batch:
        try:
            ids.append(study["protocolSection"]["identificationModule"]["nctId"])
            documents.append(
                study["protocolSection"]["descriptionModule"]["briefSummary"]
            )
        except KeyError:
            continue
print("Finished updating ChromaDB!")


@app.route("/api/query", methods=["POST"])
def query():
    query = request.json.get("query")
    neighbors = request.json.get("neighbors")
    return chroma_collection.query(query_texts=query, n_results=neighbors)
