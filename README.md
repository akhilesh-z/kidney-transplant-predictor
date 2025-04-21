# 🧠 Kidney Transplant Success Prediction using Machine Learning

This project uses machine learning models to predict the success rate of kidney transplants based on donor and recipient medical features. It aims to support healthcare professionals by providing data-driven insights to improve transplant decisions.

## 🚀 Features

- Predicts transplant outcome (Success or Failure)
- Trained models: Random Forest & XGBoost
- SMOTE used to balance imbalanced dataset
- Flask-based backend for predictions
- Simple frontend (HTML/CSS/JS) to input patient data
- Evaluates models with accuracy, ROC-AUC, and more

## 📁 Dataset Features

The dataset includes the following features:

- Recipient Age
- Recipient Gender
- Diabetes History
- Hypertension History
- Donor Age
- Donor Cause of Death
- HLA Match Score
- Cold Ischemia Time
- Transplant Outcome (Target)

> Note: Synthetic or anonymized dataset used for demonstration.

## 🛠️ Tech Stack

- Python 3.8+
- scikit-learn
- imbalanced-learn (SMOTE)
- XGBoost
- Flask
- HTML/CSS/JavaScript

## 🧪 Model Training

The models are trained using preprocessed data with one-hot encoding, SMOTE balancing, and hyperparameter tuning. Final models are saved using `joblib`.

You can retrain the model by running:

```bash
python model_rf.py
# or
python model_xgb.py
```

## 🌐 Web Interface

The frontend allows users to input patient/donor details and get real-time prediction results.

To run the app locally:

```bash
cd backend
python app.py
```

Then open the frontend index.html file in your browser.

## 📊 Results

- Random Forest Accuracy: ~89%
- XGBoost Accuracy: ~91%
- ROC-AUC Score: ~0.93 (XGBoost)

## 📦 Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/yourusername/kidney-transplant-predictor.git
cd kidney-transplant-predictor
```

2. Install requirements

```bash
pip install -r requirements.txt
```

3. Run the Flask backend:

```bash
cd backend
python app.py
```

4. Open the frontend/index.html in your browser

## 📜 License

This project is for academic and research purposes. Use responsibly. MIT License.

## 🙌 Acknowledgements

- Medical datasets for reference
- scikit-learn, XGBoost, Flask
- SMOTE via imbalanced-learn

---

Feel free to contribute or raise issues!