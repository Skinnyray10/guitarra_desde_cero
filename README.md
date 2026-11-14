# Guitarra desde cero

Tutorial interactivo para aprender guitarra desde cero hasta componer tus propias melodías. Es una sola página web, sin frameworks.

**Pruébala:** https://skinnyray10.github.io/guitarra_desde_cero/

## Qué incluye

- Seis niveles: tu guitarra, primeras notas, acordes, ritmo, escalas y tu melodía, más un plan de 8 semanas.
- Sonido de cuerda sintetizado (Karplus-Strong) con Web Audio y animaciones de cuerdas.
- Afinador con micrófono: detección de tono con [pitchy](https://github.com/ianprime0509/pitchy), filtros de audio, ruido de fondo adaptable, afinaciones Estándar, Drop D y medio tono abajo, y La de referencia ajustable.
- Retos que escuchan tu guitarra: encontrar notas y tocar el Himno a la alegría nota por nota.
- Cinco canciones tradicionales para tocar junto: Himno a la alegría, La cucaracha, La Llorona, De colores y La bamba.
- Bienvenida guiada la primera vez que entras.
- App instalable (PWA): abre sin internet en computadora, Android y iPhone.
- Espejo de postura con cámara: cuerpo y manos con MediaPipe Tasks Vision de Google.

## Pensada para cualquier equipo

- La detección de tono usa FFT: analiza ventanas de unos 170 ms en menos de 1 ms. Si la librería no carga, la app usa su propio detector.
- El espejo de postura usa la cámara a 480×360, intenta la GPU y si falla usa la CPU, y analiza menos veces por segundo si el equipo va lento.
- La app solo guarda de entrada la página y los iconos; MediaPipe y los modelos (unos 20 MB) se descargan y se guardan solo si usas el espejo.
- Respeta «reducir movimiento» del sistema.

## Con y sin internet

| Función | Sin internet |
|---|---|
| Lecciones, sonido, acordes, ritmo, escalas, taller de melodías | Sí |
| Afinador con micrófono | Sí |
| Retos que escuchan tu guitarra | Sí |
| Espejo de postura | Sí, después de usarlo una vez con internet en la app instalada |
| Tipografías | Usa las de tu sistema |

## Estructura

| Archivo o carpeta | Para qué sirve |
|---|---|
| `index.html` | Toda la aplicación (HTML, CSS y JavaScript) |
| `manifest.webmanifest`, `sw.js`, `iconos/` | Lo que la vuelve app instalable y sin internet |
| `lib/pitchy.mjs` | pitchy 4.1.0 + fft.js 4.0.4 (MIT) en un solo módulo; licencias en `lib/LICENCIAS.txt` |
| `mediapipe/` | `@mediapipe/tasks-vision` 0.10.14, oficial de Google (Apache 2.0) |
| `modelos/` | Modelos de cuerpo y manos; no se suben a git por su tamaño |
| `descargar-modelos.sh` | Descarga los modelos oficiales una sola vez |
| `servidor.py` | Servidor local mínimo con Python, sin dependencias |

Tu avance, tu melodía y tu postura de referencia se guardan en el navegador (localStorage).
