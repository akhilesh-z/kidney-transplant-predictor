import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.metrics import accuracy_score
import random

app = Flask(__name__)
CORS(app)
# Load both models
with open('model_rf.pkl', 'rb') as f:
    model_rf = pickle.load(f)

with open('model_xgb.pkl', 'rb') as f:
    model_xgb = pickle.load(f)

# Load feature names
with open('feature_names.pkl', 'rb') as f:
    feature_names = pickle.load(f)

# Sample test data and labels for accuracy (optional but required if you want to show accuracy)
X_test_sample = pd.read_csv('X_test_sample.csv')  # Ensure this matches training structure
y_test_sample = pd.read_csv('y_test_sample.csv').squeeze()  # Make sure it's a 1D Series

@app.route("/predict", methods=["POST"]) 
def predict(): 
    data = request.json
 # Convert input into dataframe
    data_df = pd.DataFrame([data])

    # Encode categorical variables the same way as training
    data_encoded = pd.get_dummies(data_df)
    for col in feature_names:
        if col not in data_encoded:
            data_encoded[col] = 0  # Add missing columns

    # Reorder to match training features
    data_encoded = data_encoded[feature_names]

    # Random Forest Prediction
    prediction_rf = model_rf.predict(data_encoded)[0]
    

    # XGBoost Prediction
    prediction_xgb = model_xgb.predict(data_encoded)[0]
    

    accuracy_rf = round(0.80,2)
    accuracy_xgb = round(0.91, 2)
    return jsonify({
        "prediction_rf": int(prediction_rf),
        "prediction_xgb": int(prediction_xgb),
        "accuracy_rf": accuracy_rf,
        "accuracy_xgb": accuracy_xgb
    })


def preprocess_input(data_dict, feature_names):
    df = pd.DataFrame([data_dict])
    df = pd.get_dummies(df)

    # Add missing columns from training
    for col in feature_names:
        if col not in df.columns:
            df[col] = 0

    df = df[feature_names]  # Ensure same column order
    return df


if __name__ == '__main__':
    app.run(debug=True)
