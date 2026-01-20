import { useEffect, useState } from "react";
import { getPayments, addPayment, deletePayment } from "../services/paymentService";

function Payment() {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ recordNumber: "", amountPaid: "" });
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    const res = await getPayments();
    setPayments(res.data || []);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAdd = async () => {
    if (!newPayment.recordNumber || !newPayment.amountPaid) {
      return alert("Fill all fields");
    }

    try {
      setLoading(true);
      await addPayment(newPayment);
      setNewPayment({ recordNumber: "", amountPaid: "" });
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Failed to add payment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paymentNumber) => {
    if (!window.confirm("Delete this payment?")) return;
    await deletePayment(paymentNumber);
    fetchPayments();
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Payments</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Record and manage service payments
        </p>
      </div>

      {/* Add Payment Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 max-w-lg mx-auto md:max-w-full">
        <h2 className="font-semibold mb-4 text-gray-700 text-lg">Add New Payment</h2>
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
          <input
            type="text"
            placeholder="Record Number"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={newPayment.recordNumber}
            onChange={(e) => setNewPayment({ ...newPayment, recordNumber: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount Paid"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={newPayment.amountPaid}
            onChange={(e) => setNewPayment({ ...newPayment, amountPaid: e.target.value })}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Add Payment"}
          </button>
        </div>
      </div>

      {/* Payments Table / Cards */}
      <div className="grid gap-4 md:grid-cols-1">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No payments recorded</p>
        ) : (
          payments.map((p) => (
            <div
              key={p.paymentNumber}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition"
            >
              <div className="mb-2 md:mb-0">
                <p className="text-sm text-gray-500">Payment #</p>
                <p className="font-semibold text-gray-800">{p.paymentNumber}</p>

                <p className="text-sm text-gray-500 mt-1">Record #</p>
                <p className="text-gray-700">{p.recordNumber}</p>

                <p className="text-sm text-gray-500 mt-1">Amount Paid</p>
                <p className="text-gray-700 font-medium">${p.amountPaid}</p>

                <p className="text-sm text-gray-500 mt-1">Date</p>
                <p className="text-gray-700">{p.paymentDate?.split("T")[0]}</p>
              </div>

              <div className="flex-shrink-0 md:ml-4">
                <button
                  onClick={() => handleDelete(p.paymentNumber)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-full md:w-auto mt-2 md:mt-0"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Payment;
