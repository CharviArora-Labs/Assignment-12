const mockAppointments = [
  { id: 1, provider: "Dr. Smith", date: "2026-03-10", time: "09:00", patient: "John Doe" },
  { id: 2, provider: "Dr. Johnson", date: "2026-03-11", time: "10:30", patient: "Jane Smith" },
  { id: 3, provider: "Dr. Smith", date: "2026-03-12", time: "14:00", patient: "Bob Wilson" },
  { id: 4, provider: "Dr. Williams", date: "2026-03-13", time: "11:00", patient: "Alice Brown" },
  { id: 5, provider: "Dr. Johnson", date: "2026-03-14", time: "15:30", patient: "Charlie Davis" },
];

const BASE_URL = "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

const api = {
  get: async (path) => {
    if (path.startsWith("/appointments")) {
      const url = new URL(path, "http://localhost");
      
      if (url.searchParams.get("simulateError")) {
        throw new Error("Network error: Unable to connect to server");
      }
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const provider = url.searchParams.get("provider");
      const date = url.searchParams.get("date");
      
      let results = [...mockAppointments];
      
      if (provider) {
        results = results.filter((a) => a.provider === provider);
      }
      
      if (date) {
        results = results.filter((a) => a.date === date);
      }
      
      return results;
    }
    
    return request(path);
  },

  post: (path, data) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default api;
