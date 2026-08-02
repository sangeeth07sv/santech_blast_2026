from pydantic import BaseModel, EmailStr


class RegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    college: str
    department: str
    year: str
    event: str
    uid: str | None = None