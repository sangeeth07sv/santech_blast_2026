from fastapi import APIRouter, HTTPException
import traceback

from database import supabase
from schemas import RegistrationCreate

router = APIRouter()


@router.post("/register")
def register(data: RegistrationCreate):
    try:
        # Prevent duplicate registration
        if data.uid:
            existing = (
                supabase
                .table("registrations")
                .select("*")
                .eq("uid", data.uid)
                .eq("event", data.event)
                .execute()
            )

            if existing.data:
                raise HTTPException(
                    status_code=400,
                    detail="You already registered for this event"
                )

        result = (
            supabase
            .table("registrations")
            .insert(data.model_dump())
            .execute()
        )

        return {
            "message": "Registration successful!",
            "registration_id": result.data[0]["id"]
        }

    except HTTPException:
        raise

    except Exception:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )


@router.get("/registrations")
def get_registrations(uid: str):
    result = (
        supabase
        .table("registrations")
        .select("*")
        .eq("uid", uid)
        .execute()
    )

    return {
        "registrations": result.data
    }