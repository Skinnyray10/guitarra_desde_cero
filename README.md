# Guitarra desde cero

Tutorial interactivo para aprender guitarra desde cero hasta componer tus propias melodías. Es una sola página web, sin frameworks.

## Qué incluye

- Seis niveles: tu guitarra, primeras notas, acordes, ritmo, escalas y tu melodía, más un plan de 8 semanas.
- Sonido de cuerda sintetizado (Karplus-Strong) con Web Audio y animaciones de cuerdas.
- Afinador con micrófono (detección de tono McLeod, sin librerías).
- Retos que escuchan tu guitarra: encontrar notas y tocar el Himno a la alegría nota por nota.
- App instalable (PWA): abre sin internet en computadora, Android y iPhone.
- Espejo de postura con cámara: cuerpo y manos con MediaPipe Tasks Vision de Google.

## Cómo abrirlo

```sh
python3 servidor.py
```

Se abre `http://localhost:8000`. El micrófono y la cámara solo funcionan en `localhost` o en un sitio con HTTPS. Si abres `index.html` con doble clic, funcionan las lecciones y el sonido, pero no la cámara.

## Publicarla en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub.
2. En el repositorio: Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Queda en `https://<usuario>.github.io/<repositorio>/` (este: https://skinnyray10.github.io/guitarra_desde_cero/) con HTTPS, así funcionan el micrófono, la cámara y el botón «Instalar app».

Al publicar una versión nueva, sube el número de `APP` en `sw.js` para que la app instalada se actualice.

## Pensada para cualquier equipo

- La detección de tono analiza a la mitad de muestras (unos 24 kHz): alrededor de 1 ms por análisis.
- El espejo de postura usa la cámara a 480×360, intenta la GPU y si falla usa la CPU, y analiza menos veces por segundo si el equipo va lento.
- La app solo guarda de entrada la página y los iconos; MediaPipe y los modelos (unos 20 MB) se descargan y se guardan solo si usas el espejo.
- Respeta «reducir movimiento» del sistema.

## Con y sin internet

| Función | Sin internet |
|---|---|
| Lecciones, sonido, acordes, ritmo, escalas, taller de melodías | Sí |
| Afinador con micrófono | Sí |
| Retos que escuchan tu guitarra | Sí |
| Espejo de postura | Sí, después de usarlo una vez con internet en la app instalada, o con `sh descargar-modelos.sh` en local |
| Tipografías | Usa las de tu sistema |

Sin los modelos en `modelos/`, el espejo los descarga de internet cada vez que lo activas.

## Estructura

| Archivo o carpeta | Para qué sirve |
|---|---|
| `index.html` | Toda la aplicación (HTML, CSS y JavaScript) |
| `manifest.webmanifest`, `sw.js`, `iconos/` | Lo que la vuelve app instalable y sin internet |
| `mediapipe/` | `@mediapipe/tasks-vision` 0.10.14, oficial de Google (Apache 2.0) |
| `modelos/` | Modelos de cuerpo y manos; no se suben a git por su tamaño |
| `descargar-modelos.sh` | Descarga los modelos oficiales una sola vez |
| `servidor.py` | Servidor local mínimo con Python, sin dependencias |

Tu avance, tu melodía y tu postura de referencia se guardan en el navegador (localStorage).
