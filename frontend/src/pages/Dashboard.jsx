import { Link, useNavigate } from "react-router-dom";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Car Repair & Payment Management System
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="self-start md:self-auto inline-flex items-center gap-2
                     bg-red-600 text-white px-4 py-2 rounded-lg text-sm
                     hover:bg-red-700 transition shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard to="/car" title="Cars" desc="Manage registered vehicles" icon="🚗" />
        <DashboardCard to="/services" title="Services" desc="Repair & service catalog" icon="🛠" />
        <DashboardCard to="/serviceRecord" title="Service Records" desc="Track repair history" icon="📄" />
        <DashboardCard to="/payment" title="Payments" desc="Record customer payments" icon="💰" />
        <DashboardCard to="/reports" title="Reports" desc="View system reports" icon="📊" />
      </div>
    </div>
  );
}

/* Reusable Dashboard Card */
function DashboardCard({ to, title, desc, icon }) {
  return (
    <Link
      to={to}
      className="group bg-white border border-gray-200 rounded-xl p-6
                 hover:shadow-lg transition flex flex-col gap-3
                 transform hover:-translate-y-1 duration-300"
    >
      <div className="text-4xl sm:text-5xl">{icon}</div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gray-500">
        {desc}
      </p>
    </Link>
  );
}

export default Dashboard;
