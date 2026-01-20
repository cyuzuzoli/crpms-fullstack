import { useEffect, useState } from "react";
import {
  getCars,
  getServices,
  getServiceRecords,
  addServiceRecord,
  deleteServiceRecord
} from "../services/serviceRecordService";

function ServiceRecord() {
  const [records, setRecords] = useState([]);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newRecord, setNewRecord] = useState({
    recordNumber: "",
    plateNumber: "",
    serviceCode: "",
    serviceDate: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const recordsRes = await getServiceRecords();
      const carsRes = await getCars();
      const servicesRes = await getServices();

      setRecords(recordsRes.data || []);
      setCars(carsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    const { recordNumber, plateNumber, serviceCode, serviceDate } = newRecord;

    if (!recordNumber || !plateNumber || !serviceCode || !serviceDate) {
      return alert("Fill all fields");
    }

    try {
      await addServiceRecord({ recordNumber, plateNumber, serviceCode, serviceDate });
      setNewRecord({ recordNumber: "", plateNumber: "", serviceCode: "", serviceDate: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding record:", err);
    }
  };

  const handleDelete = async (recordNumber) => {
    try {
      await deleteServiceRecord(recordNumber);
      fetchData();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Service Records</h1>
        <p className="text-gray-500 text-sm sm:text-base">Track and manage service records</p>
      </div>

      {/* Add Service Record Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-lg mx-auto md:max-w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Record</h2>

        {loading ? (
          <p className="text-gray-500">Loading data...</p>
        ) : (
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
            <input
              placeholder="Record Number"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newRecord.recordNumber}
              onChange={(e) =>
                setNewRecord({ ...newRecord, recordNumber: e.target.value })
              }
            />

            <select
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newRecord.plateNumber}
              onChange={(e) =>
                setNewRecord({ ...newRecord, plateNumber: e.target.value })
              }
            >
              <option value="">Select Car</option>
              {cars.length > 0 ? (
                cars.map((c) => (
                  <option key={c.plateNumber || c.id || Math.random()} value={c.plateNumber || c.numberPlate || ""}>
                    {c.plateNumber || c.numberPlate || "Unknown Car"}
                  </option>
                ))
              ) : (
                <option disabled>No cars available</option>
              )}
            </select>

            <select
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newRecord.serviceCode}
              onChange={(e) =>
                setNewRecord({ ...newRecord, serviceCode: e.target.value })
              }
            >
              <option value="">Select Service</option>
              {services.length > 0 ? (
                services.map((s) => (
                  <option key={s.serviceCode || s.id || Math.random()} value={s.serviceCode || s.code || ""}>
                    {s.serviceName || s.name || "Unknown Service"}
                  </option>
                ))
              ) : (
                <option disabled>No services available</option>
              )}
            </select>

            <input
              type="date"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newRecord.serviceDate}
              onChange={(e) =>
                setNewRecord({ ...newRecord, serviceDate: e.target.value })
              }
            />

            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium w-full md:w-auto"
            >
              Add Record
            </button>
          </div>
        )}
      </div>

      {/* Service Records List (Cards) */}
      {records.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No service records found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {records.map((r) => (
            <div
              key={r.recordNumber}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">Record #</p>
                <p className="font-semibold text-gray-800">{r.recordNumber}</p>

                <p className="text-sm text-gray-500 mt-2">Plate Number</p>
                <p className="text-gray-700">{r.plateNumber}</p>

                <p className="text-sm text-gray-500 mt-2">Service Code</p>
                <p className="text-gray-700">{r.serviceCode}</p>

                <p className="text-sm text-gray-500 mt-2">Date</p>
                <p className="text-gray-700">{r.serviceDate?.split("T")[0]}</p>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => handleDelete(r.recordNumber)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceRecord;
