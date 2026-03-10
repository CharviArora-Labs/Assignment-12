import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function DashboardList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/dashboard")
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {items.map(item => (
        <div key={item.id}>
          <Link to={`/dashboard/${item.id}`}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}