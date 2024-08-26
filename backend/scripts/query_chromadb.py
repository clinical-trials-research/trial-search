import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

# Hosting locally for now.
chroma_client = chromadb.HttpClient(host="localhost", port=8000)
chroma_collection = chroma_client.get_collection(
    name="trials",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="neuml/pubmedbert-base-embeddings"
    ),
)

print(chroma_collection.query(query_texts="cancer"))
