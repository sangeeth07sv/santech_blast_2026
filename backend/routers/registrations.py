from fastapi import APIRouter, HTTPException
import traceback

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

        return {
            "message": "Registration successful!",
            "registration_id": result.data[0]["id"]
        }

    except HTTPException:
        # Return FastAPI HTTP errors unchanged
        raise

    except Exception:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )