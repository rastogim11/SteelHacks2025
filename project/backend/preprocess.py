import cv2
import numpy as np

IMG_SIZE = 128

def preprocess_image(file_bytes):
    """Preprocess a single uploaded image (for API)."""
    img = cv2.imdecode(np.frombuffer(file_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = img.reshape(1, IMG_SIZE, IMG_SIZE, 1)
    return img
