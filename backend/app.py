from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS # Import CORS module

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load the trained model
model = load('chlorophyll.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    # Extract input values from the request
    input_data = request.json
    room_temperature = input_data['room_temperature']
    code = input_data['code']
    chab = input_data['chab']
    sdchab = input_data['sdchab']
    L = input_data['L']
    a = input_data['a']
    b = input_data['b']
    hue_angle = input_data['hue_angle']

    # Use the loaded model to make predictions
    input_values = [[room_temperature, code, chab, sdchab, L, a, b, hue_angle]]
    predicted_duration = model.predict(input_values)[0]

    # Return the predicted duration as JSON response
    return jsonify({'predicted_duration': predicted_duration})

if __name__ == '__main__':
    app.run(debug=True)
