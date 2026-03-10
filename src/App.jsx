import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import DashboardList from "./pages/DashboardList";
import DashboardDetail from "./pages/DashboardDetail";
import AppointmentsPage from "./pages/AppointmentsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<DashboardList />} />
          <Route path="/dashboard/:id" element={<DashboardDetail />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
