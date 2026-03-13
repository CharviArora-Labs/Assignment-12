const defaultAppointments = [
  { id: 1, provider: "Dr. Smith", date: "2026-03-10", time: "09:00", patient: "John Doe", notes: "" },
  { id: 2, provider: "Dr. Johnson", date: "2026-03-11", time: "10:30", patient: "Jane Smith", notes: "" },
  { id: 3, provider: "Dr. Smith", date: "2026-03-12", time: "14:00", patient: "Bob Wilson", notes: "" },
  { id: 4, provider: "Dr. Williams", date: "2026-03-13", time: "11:00", patient: "Alice Brown", notes: "" },
  { id: 5, provider: "Dr. Johnson", date: "2026-03-14", time: "15:30", patient: "Charlie Davis", notes: "" },
];

const STORAGE_KEY = 'appointments';

function loadAppointments() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [...defaultAppointments];
}

function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

let mockAppointments = loadAppointments();
let nextId = Math.max(...mockAppointments.map(a => a.id), 5) + 1;

const BASE_URL = "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "API request failed");
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
}

const api = {
  get: async (path) => {
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
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const appointment = mockAppointments.find((a) => a.id === parseInt(id));
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  },

  fetchAppointment: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const appointment = mockAppointments.find((a) => a.id === parseInt(id));
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  },

  post: async (path, data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const errors = {};
    if (!data.provider || !data.provider.trim()) {
      errors.provider = "Provider is required";
    }
    if (!data.date) {
      errors.date = "Date is required";
    }
    
    if (Object.keys(errors).length > 0) {
      const error = new Error("Validation failed");
      error.status = 422;
      error.errors = errors;
      throw error;
    }
    
    const newAppointment = {
      id: nextId++,
      ...data,
      time: "10:00",
      patient: "New Patient"
    };
    mockAppointments.push(newAppointment);
    saveAppointments(mockAppointments);
    
    return newAppointment;
  },

  put: async (path, data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const url = new URL(path, "http://localhost");
    const id = parseInt(url.pathname.split("/").pop());
    
    const errors = {};
    if (!data.provider || !data.provider.trim()) {
      errors.provider = "Provider is required";
    }
    if (!data.date) {
      errors.date = "Date is required";
    }
    
    if (Object.keys(errors).length > 0) {
      const error = new Error("Validation failed");
      error.status = 422;
      error.errors = errors;
      throw error;
    }
    
    const index = mockAppointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    
    mockAppointments[index] = { ...mockAppointments[index], ...data };
    saveAppointments(mockAppointments);
    
    return mockAppointments[index];
  },

  request,
};

export default api;
