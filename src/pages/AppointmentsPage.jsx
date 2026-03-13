import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState("");
  const [date, setDate] = useState("");
  const [simulateError, setSimulateError] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (provider) params.append("provider", provider);
      if (date) params.append("date", date);
      if (simulateError) params.append("simulateError", "true");

      const path = params.toString() 
        ? `/appointments?${params.toString()}` 
        : "/appointments";
      
      const data = await api.get(path);
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [provider, date, simulateError]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleClearFilters = () => {
    setProvider("");
    setDate("");
    setSimulateError(false);
  };

  const handleSimulateErrorChange = (e) => {
    setSimulateError(e.target.checked);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchAppointments} />;
  }

  if (appointments.length === 0) {
    return (
      <div>
        <h2>Appointments</h2>
        <div className="filters">
          <select value={provider} onChange={handleProviderChange}>
            <option value="">All Providers</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Williams">Dr. Williams</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <button onClick={handleClearFilters}>Clear</button>
          <label>
            <input
              type="checkbox"
              checked={simulateError}
              onChange={handleSimulateErrorChange}
            />
            Simulate Error
          </label>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <h2>Appointments</h2>

      <div className="filters">
        <select value={provider} onChange={handleProviderChange}>
          <option value="">All Providers</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Williams">Dr. Williams</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={handleClearFilters}>Clear</button>
        <label>
          <input
            type="checkbox"
            checked={simulateError}
            onChange={handleSimulateErrorChange}
          />
          Simulate Error
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.provider}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.patient}</td>
              <td>{a.notes || "-"}</td>
              <td><Link to={`/appointments/${a.id}/edit`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsPage;
