

# from flask import Flask, request, jsonify
# from joblib import load
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# # Load the trained models
# models = {
#     'linear_regression': load('linearregression.joblib'),
#     'svm': load('svm_model.joblib'),
#     'random_forest': load('random_forest_model.joblib')
# }

# # Placeholder for results
# results = {
#     'linear_regression': {'accuracy':-11.048978928705356},  # Placeholder accuracy value for demonstration
#     'svm': {'accuracy':-0.2667897503520371},  # Placeholder accuracy value for demonstration
#     'random_forest': {'accuracy': 0.11168163265306108}  # Placeholder accuracy value for demonstration
# }

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Extract input values from the request
#     input_data = request.json
#     room_temperature = input_data['room_temperature']
#     code = input_data['code']
#     chab = input_data['chab']
#     sdchab = input_data['sdchab']
#     L = input_data['L']
#     a = input_data['a']
#     b = input_data['b']
#     hue_angle = input_data['hue_angle']

#     # Use the loaded models to make predictions and calculate accuracy
#     predictions_and_accuracy = {}
#     for name, model in models.items():
#         result = results[name]
#         input_values = [[room_temperature, code, chab, sdchab, L, a, b, hue_angle]]
#         predicted_duration = model.predict(input_values)[0]
#         accuracy = result['accuracy']
#         predictions_and_accuracy[name] = {
#             'predicted_duration': predicted_duration,
#             'accuracy': accuracy
#         }

#     return jsonify(predictions_and_accuracy)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load models and label encoder once at app startup
models = {
    'random_forest': load('broccoli_storage_days_model.joblib'),
    'gradient_boosting': load('broccoli_storage_days_gb_model.joblib'),
    'svr': load('broccoli_storage_days_svr_model.joblib'),
    'linear_regression': load('broccoli_storage_days_lr_model.joblib'),
}
code_label_encoder = load('code_label_encoder.joblib')

results = {
    'random_forest': {'accuracy': 0.11168163265306108},  # Placeholder accuracy value for demonstration
     'gradient_boosting' : {'accuracy': 0.11168163265306108},  
     'svr':{'accuracy': 0.11168163265306108},
    'linear_regression': {'accuracy':-11.048978928705356},  # Placeholder accuracy value for demonstration
}

def predict_storage_days_with_model(model, temp, code, avg_chl_a_b, sd_chl_a_b, mean_l, mean_a, mean_b, hue_angle):
    # Encode the 'code' using the loaded label encoder
    encoded_code = code_label_encoder.transform([code])[0]
    
    # Prepare the input data as a DataFrame with correct column names
    input_data = pd.DataFrame([[temp, encoded_code, avg_chl_a_b, sd_chl_a_b, mean_l, mean_a, mean_b, hue_angle]],
                              columns=['Temp', 'code', 'Average Chlorophyll a+b', 'SD Chl a+b', 'Mean L ', 'Mean a', 'Mean b ', 'MEANHUE ANGLE'])
    
    # Predict the storage days using the provided model
    predicted_days = model.predict(input_data)
    
    return predicted_days[0]

@app.route('/predict', methods=['POST'])
def predict():
    # Extract input values from the request
    input_data = request.json
    temp = input_data.get('temp')
    code = input_data.get('code')
    avg_chl_a_b = input_data.get('avg_chl_a_b')
    sd_chl_a_b = input_data.get('sd_chl_a_b')
    mean_l = input_data.get('mean_l')
    mean_a = input_data.get('mean_a')
    mean_b = input_data.get('mean_b')
    hue_angle = input_data.get('hue_angle')

    # Use the loaded models to make predictions
    predictions = {}
    for name, model in models.items():
        result = results[name]
        predicted_days = predict_storage_days_with_model(model, temp, code, avg_chl_a_b, sd_chl_a_b, mean_l, mean_a, mean_b, hue_angle)
        accuracy = result['accuracy']
        predictions[name] = {
            'predicted_duration': predicted_days,
            'accuracy': accuracy
        }


    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
