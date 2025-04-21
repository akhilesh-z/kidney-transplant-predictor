document.getElementById("prediction-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form refresh

    // Collect form data
    const formData = {
        recipient_age: parseInt(document.getElementById("recipientAge").value),
        recipient_gender: document.getElementById("recipientGender").value,
        diabetes_history: document.getElementById("diabetesHistory").value,
        hypertension_history: document.getElementById("hypertensionHistory").value,
        donor_age: parseInt(document.getElementById("donorAge").value),
        donor_cause_of_death: document.getElementById("donorCauseOfDeath").value,
        hla_match_score: parseFloat(document.getElementById("hlaMatchScore").value),
        cold_ischemia_time: parseFloat(document.getElementById("coldIschemiaTime").value),
    };

    // API Call to Flask Backend
    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // Render prediction results
        document.getElementById("prediction-result").innerHTML =
            `<p><strong>Prediction (Random Forest):</strong> ${data.prediction_rf}</p>
             <p><strong>Prediction (XG Boost):</strong> ${data.prediction_xgb}</p>
             <hr>
             <p><strong>Random Forest Accuracy:</strong> ${data.accuracy_rf}%</p>
             <p><strong>XG Boost Accuracy:</strong> ${data.accuracy_xgb}%</p>`;

    } catch (error) {
        console.error("Error fetching prediction:", error);
        document.getElementById("prediction-result").innerHTML = 
            `<p style="color:red;">Failed to get prediction. Try again.</p>`;
    }
});


document.getElementById("prediction-form").addEventListener("submit", async function(event) { 
    event.preventDefault();

    const formData = {
        recipient_age: parseInt(document.getElementById("recipientAge").value),
        recipient_gender: document.getElementById("recipientGender").value,
        diabetes_history: document.getElementById("diabetesHistory").value,
        hypertension_history: document.getElementById("hypertensionHistory").value,
        donor_age: parseInt(document.getElementById("donorAge").value),
        donor_cause_of_death: document.getElementById("donorCauseOfDeath").value,
        hla_match_score: parseFloat(document.getElementById("hlaMatchScore").value),
        cold_ischemia_time: parseFloat(document.getElementById("coldIschemiaTime").value),
    };
    
    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        document.getElementById("prediction-result").innerHTML =
            `<p>Prediction (Random Forest): <strong>${data.prediction_rf === 1 ? "Success" : "Failure"}</strong></p>
             <p>Prediction (XG Boost): <strong>${data.prediction_xgb === 1 ? "Success" : "Failure"}</strong></p>
             <hr>
             <p>Random Forest Accuracy: <strong>${(data.accuracy_rf * 100).toFixed(2)}%</strong></p>
             <p>XG Boost Accuracy: <strong>${(data.accuracy_xgb * 100).toFixed(2)}%</strong></p>`;
    
    } catch (error) {
        console.error("Error fetching prediction:", error);
        document.getElementById("prediction-result").innerHTML =
            `<p style="color:red;">Failed to get prediction. Try again.</p>`;
    }
});    