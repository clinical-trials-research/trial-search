import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from flask import Flask, request

app = Flask(__name__)

# Hosting locally for now.
chroma_client = chromadb.HttpClient(host="localhost", port=8000)
chroma_collection = chroma_client.get_or_create_collection(
    name="trials",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="neuml/pubmedbert-base-embeddings"
    ),
)


@app.route("/query", methods=["POST"])
def query():
    query_text = request.json.get("query")
    return chroma_collection.query(query_texts=query_text)
