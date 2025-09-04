# Use a lightweight Python base image
FROM python:3.9-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port your FastAPI application will listen on (default is 8000)
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
# Replace 'main:app' with the actual module and FastAPI instance name if different
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]