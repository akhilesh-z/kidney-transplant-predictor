import pandas as pd
import numpy as np

# Number of success and failure cases
num_cases = 500  # 500 success + 500 failure = 1000 total

# Function to generate random values for each feature
def generate_data(label):
    return {
        "recipient_age": np.random.randint(18, 76),
        "recipient_gender": np.random.choice(["Male", "Female"]),
        "diabetes_history": np.random.choice(["Yes", "No"]),
        "hypertension_history": np.random.choice(["Yes", "No"]),
        "donor_age": np.random.randint(18, 81),
        "donor_cause_of_death": np.random.choice(["Trauma", "Stroke", "Heart Attack"]),
        "hla_match_score": np.round(np.random.uniform(0, 10), 1),
        "cold_ischemia_time": np.round(np.random.uniform(0, 48), 1),
        "transplant_outcome": label  # 1 for success, 0 for failure
    }

# Create equal success and failure cases
success_cases = [generate_data(1) for _ in range(num_cases)]
failure_cases = [generate_data(0) for _ in range(num_cases)]

# Combine into a DataFrame
dataset = pd.DataFrame(success_cases + failure_cases)

# Shuffle dataset to mix success and failure cases
dataset = dataset.sample(frac=1, random_state=42).reset_index(drop=True)

# Save to CSV
dataset.to_csv("kidney_transplant_dataset.csv", index=False)

print("Dataset created with", len(dataset), "rows (50% success, 50% failure).")
