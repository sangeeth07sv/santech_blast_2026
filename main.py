"""Convenience entrypoint so the app can be run as `python main.py`
or referenced by platforms (like Render) as `main:app`.
"""

from app.main import app

__all__ = ["app"]

if __name__ == "__main__":
    import uvicorn

    from app.config import get_settings

    settings = get_settings()
    uvicorn.run("main:app", host="0.0.0.0", port=settings.port, reload=True)
