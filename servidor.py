"""Abre el tutorial en http://localhost:8000 sin necesitar internet.

Uso:  python3 servidor.py
La cámara y el micrófono solo funcionan en localhost o en sitios con HTTPS.
"""
import functools
import http.server
import os
import webbrowser

PUERTO = 8000
CARPETA = os.path.dirname(os.path.abspath(__file__))

Manejador = functools.partial(http.server.SimpleHTTPRequestHandler, directory=CARPETA)
http.server.SimpleHTTPRequestHandler.extensions_map.update({
    ".mjs": "text/javascript",
    ".wasm": "application/wasm",
    ".task": "application/octet-stream",
    ".webmanifest": "application/manifest+json",
})

with http.server.ThreadingHTTPServer(("127.0.0.1", PUERTO), Manejador) as servidor:
    url = f"http://localhost:{PUERTO}"
    print(f"Tutorial en {url}  (Ctrl+C para cerrar)")
    webbrowser.open(url)
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor cerrado.")
