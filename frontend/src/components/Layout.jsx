import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Button (ALWAYS VISIBLE) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white
                   p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Page Content */}
      <main className="p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
