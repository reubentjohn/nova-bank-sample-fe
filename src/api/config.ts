// Set this to your Express backend URL when running locally
// e.g. "http://localhost:3001"
// When null, the app uses the built-in mock API
export const API_BASE_URL: string | null = null;

export const USE_MOCK = API_BASE_URL === null;
