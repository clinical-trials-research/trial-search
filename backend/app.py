import time

import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    metadata={"hnsw:space": "cosine"},
)


@app.route("/api/query", methods=["POST"])
def query():
    query = request.json.get("query")
    neighbors = request.json.get("neighbors")
    return chroma_collection.query(query_texts=query, n_results=neighbors)
