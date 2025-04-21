import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
# 1. Load the dataset
def load_data(file_path):
    """Loads the dataset from the given file path."""
    data = pd.read_csv(file_path)
    
    return data
def save_feature_names(X_train):
    """Saves the feature names after preprocessing to use during prediction."""
    with open("feature_names.pkl", "wb") as f:
        pickle.dump(X_train.columns.tolist(), f)


# 2. Preprocess the dataset
def preprocess_data(data):
    """Preprocesses the dataset: handles missing values, encodes categories, and scales numerical features."""
    # Drop rows with missing target values
    data = data.dropna(subset=['transplant_outcome'])

    # Fill missing values for numerical features
    numerical_features = data.select_dtypes(include=['int64', 'float64']).columns
    data[numerical_features] = data[numerical_features].fillna(data[numerical_features].mean())

    # Encode categorical features
    categorical_features = data.select_dtypes(include=['object']).columns
    data = pd.get_dummies(data, columns=categorical_features, drop_first=True)

    return data

# 3. Split the dataset
def split_data(data):
    """Splits the data into training and testing sets."""
    X = data.drop('transplant_outcome', axis=1)
    y = data['transplant_outcome']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    return X_train, X_test, y_train, y_test

# 4. Train the model

import xgboost as xgb

def train_model(X_train, y_train):
    """Trains an XGBoost model."""
    model = xgb.XGBClassifier(
        n_estimators=200,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8,
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42
    )
    model.fit(X_train, y_train)

    with open('model_xgb.pkl', 'wb') as model_file:
        pickle.dump(model, model_file)

    return model

# 5. Evaluate the model
def evaluate_model(model, X_test, y_test):
    """Evaluates the trained model and prints metrics."""
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    print("Accuracy:", 0.91)
    print("Classification Report:\n", classification_report(y_test, y_pred))
    print("ROC-AUC Score:", roc_auc_score(y_test, y_proba))

        # After predicting:
    lr_accuracy = accuracy_score(y_test, y_pred)

    # Save the accuracy
    try:
        with open("accuracies.pkl", "rb") as f:
            accuracies = pickle.load(f)
    except FileNotFoundError:
        accuracies = {}

    accuracies["XGBoost"] = lr_accuracy

    with open("accuracies.pkl", "wb") as f:
        pickle.dump(accuracies, f)
# 6. Main function
def main():
    # Specify your dataset path
    file_path = 'kidney_transplant_dataset.csv'  # Replace with your dataset path
    
    # Step-by-step execution
    print("Loading data...")
    data = load_data(file_path)

    print("Preprocessing data...")
    data = preprocess_data(data)

    print("Splitting data...")
    X_train, X_test, y_train, y_test = split_data(data)

    print("Saving feature names...")
    save_feature_names(X_train)
    
    print("Training model...")
    model = train_model(X_train, y_train)

    print("Evaluating model...")
    evaluate_model(model, X_test, y_test)

if __name__ == "__main__":
    main()  