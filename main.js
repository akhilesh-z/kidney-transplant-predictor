import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const KidneyTransplantPrediction = () => {
  const [formData, setFormData] = useState({
    recipientAge: "",
    recipientGender: "",
    diabetesHistory: "",
    hypertensionHistory: "",
    donorAge: "",
    donorCauseOfDeath: "",
    hlaMatchScore: "",
    coldIschemiaTime: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <Card>
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Kidney Transplant Success Prediction</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recipientAge">Recipient Age</Label>
              <Input
                type="number"
                id="recipientAge"
                name="recipientAge"
                value={formData.recipientAge}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="recipientGender">Recipient Gender</Label>
              <select
                id="recipientGender"
                name="recipientGender"
                value={formData.recipientGender}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <Label htmlFor="diabetesHistory">Diabetes History</Label>
              <select
                id="diabetesHistory"
                name="diabetesHistory"
                value={formData.diabetesHistory}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <Label htmlFor="hypertensionHistory">Hypertension History</Label>
              <select
                id="hypertensionHistory"
                name="hypertensionHistory"
                value={formData.hypertensionHistory}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <Label htmlFor="donorAge">Donor Age</Label>
              <Input
                type="number"
                id="donorAge"
                name="donorAge"
                value={formData.donorAge}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="donorCauseOfDeath">Donor Cause of Death</Label>
              <select
                id="donorCauseOfDeath"
                name="donorCauseOfDeath"
                value={formData.donorCauseOfDeath}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select Cause</option>
                <option value="Trauma">Trauma</option>
                <option value="Stroke">Stroke</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="hlaMatchScore">HLA Match Score</Label>
              <Input
                type="number"
                id="hlaMatchScore"
                name="hlaMatchScore"
                value={formData.hlaMatchScore}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="coldIschemiaTime">Cold Ischemia Time (hrs)</Label>
              <Input
                type="number"
                step="0.1"
                id="coldIschemiaTime"
                name="coldIschemiaTime"
                value={formData.coldIschemiaTime}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Predict</Button>
          </form>

          {prediction !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h2 className="text-lg font-bold">Prediction Result:</h2>
              <p>{prediction === 1 ? "Success" : "Failure"}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KidneyTransplantPrediction;
