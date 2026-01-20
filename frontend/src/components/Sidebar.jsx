import { Link, useLocation } from "react-router-dom";

function Sidebar({ open, onClose }) {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">CRPMS</h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/dashboard" onClick={onClose} className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/car" onClick={onClose} className={linkClass("/car")}>
            Cars
          </Link>
          <Link to="/services" onClick={onClose} className={linkClass("/services")}>
            Services
          </Link>
          <Link to="/serviceRecord" onClick={onClose} className={linkClass("/serviceRecord")}>
            Service Records
          </Link>
          <Link to="/payment" onClick={onClose} className={linkClass("/payment")}>
            Payments
          </Link>
          <Link to="/reports" onClick={onClose} className={linkClass("/reports")}>
            Reports
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
