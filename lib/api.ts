import type { RegistrationPayload } from "@/types";

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export interface SubmitRegistrationResult {
  success: boolean;
  message: string;
  registrationId?: string;
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<SubmitRegistrationResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.detail ?? "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      message: "Registration successful!",
      registrationId: data?.registration_id,
    };
  } catch {
    return {
      success: false,
      message:
        "Could not reach the server. Please check your connection and try again.",
    };
  }
}

export interface FetchRegistrationsResult {
  success: boolean;
  data: Array<Record<string, unknown>>;
}

export async function fetchRegistrationByUid(
  uid: string
): Promise<FetchRegistrationsResult> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/registrations?uid=${encodeURIComponent(uid)}`
    );
    if (!response.ok) {
      return { success: false, data: [] };
    }
    const data = await response.json();
    return { success: true, data: data?.registrations ?? [] };
  } catch {
    return { success: false, data: [] };
  }
}
