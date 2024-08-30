FROM python:3.11-slim

RUN pip install poetry==1.8.3

WORKDIR /app

COPY pyproject.toml poetry.lock app.py ./

RUN poetry install --without dev

CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:8001", "app:app"]
