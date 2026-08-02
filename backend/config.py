from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )

    supabase_url: str
    supabase_key: str

    firebase_project_id: str | None = None
    firebase_service_account_json: str | None = None
    google_application_credentials: str | None = None

    allowed_origins: str = "*"


settings = Settings()