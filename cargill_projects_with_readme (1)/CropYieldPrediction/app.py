
from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Dummy model: yield = rainfall * 0.5 + fertilizer * 2 + soil * 10
@app.route('/predict', methods=['GET'])
def predict():
    rainfall = float(request.args.get('rainfall'))
    fertilizer = float(request.args.get('fertilizer'))
    soil = float(request.args.get('soil'))

    yield_pred = rainfall * 0.5 + fertilizer * 2 + soil * 10
    return jsonify({'yield_prediction': yield_pred})

if __name__ == '__main__':
    app.run(debug=True)
