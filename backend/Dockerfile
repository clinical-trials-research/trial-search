FROM python:3.11-slim

RUN pip install poetry

COPY . .

RUN poetry install

CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:8001", "app:app"]
