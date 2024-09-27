# Trial Search

This website was created as a literature review tool for researchers to find semantically similar clinical trials. We queried and embedded all clinical trials from <https://clinicaltrials.gov/> using the [BiomedBERT model](https://huggingface.co/microsoft/BiomedNLP-BiomedBERT-base-uncased-abstract) and stored the embeddings using [ChromaDB](https://www.trychroma.com/).

## Usage

Install the repo:

```bash
git clone https://github.com/clinical-trials-research/trial-search.git
cd trial-search
```

[Docker](https://www.docker.com/) is required to run this application.

### Database Installation

Install poetry:

```bash
pip install poetry
```

To install the database and the embeddings, activate a virtual environment with poetry:

```bash
cd backend
poetry install
poetry shell
```

Run `download_database.py`:

```bash
poetry run python3 download_database.py
```

### Running the Application

To run a development environment accessible at <http://localhost:5173>:

```bash
docker compose -f compose.dev.yaml up --build --watch
```

To run the production environment for hosting accessible at <http://localhost>:

```bash
docker compose -f compose.prod.yaml up --build
```
