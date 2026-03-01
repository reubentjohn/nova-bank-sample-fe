import { API_BASE_URL, USE_MOCK } from "./config";
import { getMockFeatures } from "./mockData";
import type { FeatureConfig, TrackResponse, SimulateResponse, UserType, Environment } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchFeatures(
  userType: UserType,
  environment: Environment,
  userId = "user_demo_001"
): Promise<FeatureConfig> {
  if (USE_MOCK) {
    await delay(400); // simulate network
    return getMockFeatures(userType, environment);
  }

  const params = new URLSearchParams({ user_type: userType, environment, user_id: userId });
  const res = await fetch(`${API_BASE_URL}/api/features?${params}`);
  if (!res.ok) throw new Error("Failed to fetch features");
  return res.json();
}

export async function trackEvent(
  eventKey: string,
  userId: string,
  userType: UserType,
  environment: Environment
): Promise<TrackResponse> {
  if (USE_MOCK) {
    await delay(200);
    console.log(`[Mock] Tracked event: ${eventKey} for ${userId} (${userType}/${environment})`);
    return { success: true, event: eventKey };
  }

  const res = await fetch(`${API_BASE_URL}/api/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_key: eventKey, user_id: userId, user_type: userType, environment }),
  });
  if (!res.ok) throw new Error("Failed to track event");
  return res.json();
}

export async function simulateEvents(
  environment: Environment,
  scenario: "high_engagement" | "low_engagement"
): Promise<SimulateResponse> {
  if (USE_MOCK) {
    await delay(1500);
    console.log(`[Mock] Simulated ${scenario} for ${environment}`);
    return { success: true, scenario, users_simulated: 20 };
  }

  const res = await fetch(`${API_BASE_URL}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ environment, scenario }),
  });
  if (!res.ok) throw new Error("Failed to simulate");
  return res.json();
}
