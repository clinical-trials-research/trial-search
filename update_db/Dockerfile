FROM python:3.11-slim

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY update_db.py .

CMD ["python3", "update_db.py"]
