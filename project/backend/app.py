from flask import Flask, request, jsonify
import tensorflow as tf
from preprocess import preprocess_image
import os

app = Flask(__name__)

MODEL_PATH = "saved_models/model.h5"

# Load model once at startup
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
else:
    model = None
    print("⚠️ No model found! Train one first with model.py")

@app.route("/")
def home():
    return {"message": "Cancer Detection API is running!"}

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not trained yet!"}), 500

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded!"}), 400

    file = request.files["image"].read()
    img = preprocess_image(file)

    pred = model.predict(img)[0][0]
    return jsonify({
        "cancer_probability": float(pred),
        "has_cancer": bool(pred > 0.5)
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
