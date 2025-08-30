
# Crop Yield Prediction (Java + Python)

A hybrid project combining Java and Python for predicting crop yields.

## Features
- Java client fetches predictions from Python Flask API
- Predicts yield based on rainfall, fertilizer, and soil type
- Demonstrates integration of machine learning into enterprise apps

## Tech Stack
- Java
- Python (Flask, NumPy)
- REST API

## How to Run
1. Start the Python API:
```bash
python app.py
```
2. Run the Java program:
```bash
javac CropYieldPrediction.java
java com.cargill.cropyield.CropYieldPrediction
```
