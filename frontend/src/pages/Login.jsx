import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      alert("Enter username and password");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(credentials);
      onLogin(res.data);
      navigate("/Dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">CRPMS Login</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Car Repair & Payment Management System
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium
                       hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Footer / Register */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
