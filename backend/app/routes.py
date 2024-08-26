import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from flask import Flask, request

app = Flask(__name__)

# Hosting locally for now.
chroma_client = chromadb.HttpClient(host="localhost", port=8000)
print(chroma_client.heartbeat())

chroma_collection = chroma_client.create_collection(
    name="trials",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="neuml/pubmedbert-base-embeddings"
    ),
)
