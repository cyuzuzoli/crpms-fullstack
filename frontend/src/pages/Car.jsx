import { useEffect, useState } from "react";
import { getCars, addCar, deleteCar } from "../services/carService";

function Car() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    plateNumber: "",
    type: "",
    model: "",
    year: "",
    driverPhone: "",
    mechanicName: ""
  });

  const fetchCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAdd = async () => {
    if (!newCar.plateNumber) return alert("Plate number required");
    await addCar(newCar);
    setNewCar({ plateNumber: "", type: "", model: "", year: "", driverPhone: "", mechanicName: "" });
    fetchCars();
  };

  const handleDelete = async (plateNumber) => {
    await deleteCar(plateNumber);
    fetchCars();
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Management</h1>

      {/* Add Car Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
        <div className="flex flex-col gap-3">
          {["Plate Number", "Type", "Model", "Year", "Driver Phone", "Mechanic Name"].map((label, index) => {
            const key = label.replace(" ", "").toLowerCase();
            return (
              <input
                key={index}
                placeholder={label}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={newCar[key] || ""}
                onChange={(e) => setNewCar({ ...newCar, [key]: e.target.value })}
              />
            );
          })}
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Car
          </button>
        </div>
      </div>

      {/* Cars Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Plate", "Type", "Model", "Year", "Driver", "Mechanic", "Actions"].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cars.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-600">{c.plateNumber}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{c.type}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{c.model}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{c.year}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{c.driverPhone}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{c.mechanicName}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDelete(c.plateNumber)}
                    className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Car;
