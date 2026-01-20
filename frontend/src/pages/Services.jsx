import { useEffect, useState } from "react";
import { getServices, addService, deleteService } from "../services/servicesService";

function Services() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    serviceName: "",
    servicePrice: ""
  });

  const fetchServices = async () => {
    const res = await getServices();
    setServices(res.data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async () => {
    if (!newService.serviceName || !newService.servicePrice) {
      return alert("Fill all fields");
    }

    await addService({
      serviceName: newService.serviceName,
      servicePrice: newService.servicePrice
    });

    setNewService({ serviceName: "", servicePrice: "" });
    fetchServices();
  };

  const handleDelete = async (serviceCode) => {
    await deleteService(serviceCode);
    fetchServices();
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Services</h1>

      {/* Add Service Form */}
      <div className="bg-white rounded-2xl shadow-md p-10 mb-9 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Service</h2>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <input
            placeholder="Service Name"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={newService.serviceName}
            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
          />
          <input
            placeholder="Price"
            type="number"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={newService.servicePrice}
            onChange={(e) => setNewService({ ...newService, servicePrice: e.target.value })}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>

      {/* Services Cards */}
      {services.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No services available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.serviceCode}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="text-sm text-gray-500">Service Code</p>
                <p className="font-semibold text-gray-800 mb-2">{s.serviceCode}</p>

                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-700 mb-2">{s.serviceName}</p>

                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium text-gray-700 mb-2">{s.servicePrice}RWF</p>
              </div>

              <button
                onClick={() => handleDelete(s.serviceCode)}
                className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
