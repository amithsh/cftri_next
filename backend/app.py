

from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load the trained models
models = {
    'linear_regression': load('linearregression.joblib'),
    'svm': load('svm_model.joblib'),
    'random_forest': load('random_forest_model.joblib')
}

# Placeholder for results
results = {
    'linear_regression': {'accuracy':-11.048978928705356},  # Placeholder accuracy value for demonstration
    'svm': {'accuracy':-0.2667897503520371},  # Placeholder accuracy value for demonstration
    'random_forest': {'accuracy': 0.11168163265306108}  # Placeholder accuracy value for demonstration
}

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

    # Use the loaded models to make predictions and calculate accuracy
    predictions_and_accuracy = {}
    for name, model in models.items():
        result = results[name]
        input_values = [[room_temperature, code, chab, sdchab, L, a, b, hue_angle]]
        predicted_duration = model.predict(input_values)[0]
        accuracy = result['accuracy']
        predictions_and_accuracy[name] = {
            'predicted_duration': predicted_duration,
            'accuracy': accuracy
        }

    return jsonify(predictions_and_accuracy)

if __name__ == '__main__':
    app.run(debug=True)
