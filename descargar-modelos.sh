#!/bin/sh
# Descarga una sola vez los modelos oficiales de MediaPipe (Google) para el espejo de postura.
# Después de esto, el espejo funciona sin internet.
set -e
cd "$(dirname "$0")/modelos"
BASE="https://storage.googleapis.com/mediapipe-models"
curl -fL -o pose_landmarker_lite.task "$BASE/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task"
curl -fL -o hand_landmarker.task "$BASE/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
echo "Listo: modelos guardados en la carpeta modelos."
