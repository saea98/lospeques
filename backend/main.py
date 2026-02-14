from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os

app = FastAPI(title="San Valentín - Mensajes Personalizados")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    """Verificar que el servidor está activo."""
    return {"status": "ok", "message": "¡San Valentín listo! 💕"}


@app.get("/api/mensaje")
def obtener_mensaje(de: str = "", para: str = "", mensaje: str = ""):
    """Obtener datos del mensaje personalizado (para validación o uso futuro)."""
    return {
        "de": de or "Alguien especial",
        "para": para or "Alguien querido",
        "mensaje": mensaje or "Con cariño en este día especial ❤️",
    }


# En producción (Docker): servir el build de React (ruta catch-all al final)
FRONTEND_DIST = Path(os.environ.get("FRONTEND_DIST", ""))
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        """Sirve el frontend React (SPA)."""
        file_path = FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(FRONTEND_DIST / "index.html")
