from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import predict_image

app = FastAPI()

# ✅ Enable CORS so React frontend (localhost:3000) can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict to ["http://localhost:3000"] later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Backend is running 🚀"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded image bytes
        image_bytes = await file.read()
        
        # Run prediction
        pred_class, probability = predict_image(image_bytes)
        
        return {
            "prediction": pred_class,
            "probability": float(probability * 100)  # percentage
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
