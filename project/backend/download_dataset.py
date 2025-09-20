import os
import kagglehub  # Make sure this is installed via pip
import zipfile
import shutil

# Set paths
BASE_DIR = "datasets/lung_cancer"
CANCER_DIR = os.path.join(BASE_DIR, "cancer")
HEALTHY_DIR = os.path.join(BASE_DIR, "healthy")

# Example KaggleHub dataset URLs (replace with actual IDs)
BENIGN_DATASET_ID = "project\backend\datasets\lung_cancer\healthy"
MALIGNANT_DATASET_ID = "project\backend\datasets\lung_cancer\cancer"

def download_and_extract(dataset_id, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    print(f"Downloading {dataset_id}...")
    path = kagglehub.dataset_download(dataset_id, force=True)  # downloads as zip
    with zipfile.ZipFile(path, 'r') as zip_ref:
        zip_ref.extractall(target_dir)
    os.remove(path)
    print(f"Extracted to {target_dir}")

def organize_dataset(src_dir, dst_dir):
    """
    Moves all image files to dst_dir (flattening folder structure if needed)
    """
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                shutil.move(os.path.join(root, file), os.path.join(dst_dir, file))
    shutil.rmtree(src_dir)  # clean up leftover folders

def main():
    download_and_extract(BENIGN_DATASET_ID, "temp_benign")
    organize_dataset("temp_benign", HEALTHY_DIR)

    download_and_extract(MALIGNANT_DATASET_ID, "temp_malignant")
    organize_dataset("temp_malignant", CANCER_DIR)

    print("Datasets downloaded and organized successfully!")

if __name__ == "__main__":
    main()
