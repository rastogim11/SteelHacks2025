import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import load_img, img_to_array
from io import BytesIO

IMG_SIZE = 128
BATCH_SIZE = 32
EPOCHS = 10


def build_model():
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation="relu", input_shape=(IMG_SIZE, IMG_SIZE, 1)),
        layers.MaxPooling2D(2, 2),
        layers.Conv2D(64, (3, 3), activation="relu"),
        layers.MaxPooling2D(2, 2),
        layers.Flatten(),
        layers.Dense(128, activation="relu"),
        layers.Dense(1, activation="sigmoid")
    ])
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
    return model


def train_and_save(data_dir="datasets/lung_cancer", save_path="saved_models/model.h5"):
    """
    Trains the CNN on datasets with folder structure:
    datasets/lung_cancer/
        cancer/
        healthy/
    """
    datagen = ImageDataGenerator(rescale=1.0 / 255, validation_split=0.2)

    train_data = datagen.flow_from_directory(
        data_dir,
        target_size=(IMG_SIZE, IMG_SIZE),
        color_mode="grayscale",
        batch_size=BATCH_SIZE,
        class_mode="binary",
        subset="training"
    )

    val_data = datagen.flow_from_directory(
        data_dir,
        target_size=(IMG_SIZE, IMG_SIZE),
        color_mode="grayscale",
        batch_size=BATCH_SIZE,
        class_mode="binary",
        subset="validation"
    )

    model = build_model()
    model.fit(train_data, validation_data=val_data, epochs=EPOCHS)

    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    model.save(save_path)
    print(f"Model saved to {save_path}")


def predict_image(image_bytes, model_path="saved_models/model.h5"):
    """
    Loads a trained model and predicts on an uploaded image.
    Returns the predicted class and probability.
    """
    # Load the saved model
    model = tf.keras.models.load_model(model_path)

    # Convert bytes -> image -> array
    img = load_img(BytesIO(image_bytes), target_size=(IMG_SIZE, IMG_SIZE), color_mode="grayscale")
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    prediction = model.predict(img_array)[0][0]
    pred_class = "Cancer" if prediction > 0.5 else "Healthy"

    return pred_class, float(prediction)
