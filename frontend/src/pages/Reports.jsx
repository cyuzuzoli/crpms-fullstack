import { useEffect, useState } from "react";
import { getServiceRecords } from "../services/serviceRecordService";

function Reports() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await getServiceRecords();
      setRecords(res.data || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Service Reports</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Overview of all service records
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500 py-6">Loading reports...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No records found</p>
      ) : (
        /* Responsive Cards */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {records.map((r) => (
            <div
              key={r.recordNumber}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">Record #</p>
              <p className="font-semibold text-gray-800">{r.recordNumber}</p>

              <p className="text-sm text-gray-500 mt-2">Plate Number</p>
              <p className="text-gray-700">{r.plateNumber}</p>

              <p className="text-sm text-gray-500 mt-2">Service</p>
              <p className="text-gray-700">{r.serviceName}</p>

              <p className="text-sm text-gray-500 mt-2">Service Date</p>
              <p className="text-gray-700">{r.serviceDate?.split("T")[0]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
