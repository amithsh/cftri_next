# !pip install streamlit
import streamlit as st
from joblib import load

# Load the trained model
model = load('chlorophyll.joblib')

# Function to predict storage duration
def predict_storage_duration(room_temperature,code,chab,sdchab,L, a, b, hue_angle):
    # Assuming 'model' is the trained linear regression model
    input_data = [[room_temperature,code,chab,sdchab,L, a, b, hue_angle]]
    predicted_duration = model.predict(input_data)
    return predicted_duration[0]

# Streamlit UI
st.title('Broccoli Storage Duration Predictor')

st.header('Enter Color Measurements and Room Temperature:')
L = st.number_input('L* (Lightness)', min_value=0.0, max_value=100.0, step=1.0)
a = st.number_input('a* (Green to Red)', min_value=-128.0, max_value=128.0, step=1.0)
b = st.number_input('b* (Blue to Yellow)', min_value=-128.0, max_value=128.0, step=1.0)
hue_angle = st.number_input('Hue Angle', min_value=0.0, max_value=360.0, step=1.0)
code = st.number_input('Code (0 for MAP + C and 1 for P+C)', min_value=1,max_value=2, step=1)
room_temperature = st.number_input('Room Temperature', min_value=0.0, step=1.0)
chab = st.number_input('Chlorophyll(a+b)', min_value=0.0, step=1.0)
sdchab = st.number_input('sd chl(a+b)', min_value=0.0, step=1.0)

if st.button('Predict Storage Duration'):
    predicted_duration = predict_storage_duration(room_temperature,code,chab,sdchab,L, a, b, hue_angle)
    st.success(f'Predicted Storage Duration: {round(predicted_duration)} days')
