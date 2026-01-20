import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Car from "./pages/Car";
import Services from "./pages/Services";
import ServiceRecord from "./pages/ServiceRecord";
import Payment from "./pages/Payment";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login onLogin={setUser} />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Dashboard onLogout={() => setUser(null)} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/car"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Car user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Services user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/serviceRecord"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <ServiceRecord user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Payment user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Reports user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
