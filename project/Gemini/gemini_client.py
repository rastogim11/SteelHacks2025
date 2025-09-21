from typing import Any
from google import genai
import traceback

_client = genai.Client()

def _extract_text(resp: Any) -> str:
    if hasattr(resp, "text") and resp.text:
        return resp.text
    try:
        cands = getattr(resp, "candidates", None) or []
        if cands and hasattr(cands[0], "content"):
            parts = getattr(cands[0].content, "parts", None) or []
            if parts and hasattr(parts[0], "text"):
                return parts[0].text
    except Exception:
        pass
    return str(resp)

def generate_text(prompt: str, model: str = "gemini-1.5-flash", **kwargs: Any) -> str:
    try:
        resp = _client.models.generate_content(
            model=model,
            contents=prompt,
            **kwargs
        )
        return _extract_text(resp)
    except Exception as e:
        return f"[Gemini error] {e}\n{traceback.format_exc()}"
