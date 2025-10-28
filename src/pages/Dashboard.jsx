import { useNavigate } from "react-router-dom";
import { LogOut, Ticket, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { logoutUser } from "../services/authService";
import { getTicketsStats } from "../services/ticketService";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const stats = getTicketsStats();
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if(loading) return 

    setLoading(true)
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to logout")
    }finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#4f46e5]">🎟️ TicketApp</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white text-sm px-2 py-2 rounded-lg"
        >
          {
            loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : <>
              <LogOut size={15} />
              Logout
            </>
          }
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <Ticket className="text-blue-600" size={36} />
            <div>
              <p className="text-gray-500 text-sm">Total Tickets</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <Clock className="text-amber-500" size={36} />
            <div>
              <p className="text-gray-500 text-sm">Open Tickets</p>
              <h3 className="text-2xl font-bold">{stats.open}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <CheckCircle className="text-green-600" size={36} />
            <div>
              <p className="text-gray-500 text-sm">Resolved Tickets</p>
              <h3 className="text-2xl font-bold">{stats.closed}</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/tickets")}
            className="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-6 py-3 rounded-lg shadow-md"
          >
            Manage Tickets
          </button>
        </div>
      </main>
    </div>
  );
}


export default Dashboard;