from fastapi import APIRouter, HTTPException
from database import supabase
from schemas import RegistrationCreate
import traceback

router = APIRouter()


@router.post("/register")
def register(data: RegistrationCreate):
    try:
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

        print("INSERT RESULT:", result)
        print("INSERT DATA:", result.data)

        return {
            "message": "Registration successful!",
            "registration_id": result.data[0]["id"]
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))