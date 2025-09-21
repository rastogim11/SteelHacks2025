import os
from google import genai
from Gemini.gemini_client import generate_text

print("google-genai SDK version:", getattr(genai, "__version__", "unknown"))
print("API key present:", bool(os.getenv("GEMINI_API_KEY")))
print("API key prefix:", os.getenv("GEMINI_API_KEY","")[:4])

print("\n=== Calling Gemini ===")
text = generate_text("Say hello from Gemini in 2 short sentences.")
print("\nRESPONSE:\n", text)
