import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import DashboardList from "./pages/DashboardList";
import DashboardDetail from "./pages/DashboardDetail";
import AppointmentsPage from "./pages/AppointmentsPage";
import AppointmentCreate from "./pages/AppointmentCreate";
import AppointmentEdit from "./pages/AppointmentEdit";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<DashboardList />} />
          <Route path="/dashboard/:id" element={<DashboardDetail />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/appointments/new" element={<AppointmentCreate />} />
          <Route path="/appointments/:id/edit" element={<AppointmentEdit />} />       
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
