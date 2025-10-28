import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Edit3, Save, Loader2 } from "lucide-react";
import TicketCard from "../components/TicketCard";
import {
  getAllTickets,
  createTicket,
  editTicket,
  deleteTicket,
  getTicketById,
} from "@/services/ticketService.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Tickets() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tickets
  const {
    data: tickets = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
    refetchOnWindowFocus: false,
  });

  // Populate form when editing
  useEffect(() => {
    if (editingId) {
      const ticket = getTicketById(editingId);
      if (ticket) setForm(ticket);
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Simple validation
    if (name === "title" && !value.trim()) setErrors((prev) => ({ ...prev, title: "Title is required." }));
    else if (name === "status" && !["open", "in_progress", "closed"].includes(value))
      setErrors((prev) => ({ ...prev, status: "Status must be open, in progress, or closed." }));
    else if (name === "description" && value.length > 200)
      setErrors((prev) => ({ ...prev, description: "Description must be under 200 characters." }));
    else if (name === "priority" && value && !["low", "medium", "high"].includes(value))
      setErrors((prev) => ({ ...prev, priority: "Priority must be low, medium, or high." }));
    else setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = "Title is required.";
    if (!data.status.trim() || !["open", "in_progress", "closed"].includes(data.status))
      newErrors.status = "Status must be open, in progress, or closed.";
    if (data.description && data.description.length > 200)
      newErrors.description = "Description must be under 200 characters.";
    if (data.priority && !["low", "medium", "high"].includes(data.priority))
      newErrors.priority = "Priority must be low, medium, or high.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or edit ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate(form)) return;

    setLoading(true);
    try {
      if (editingId) {
        await editTicket({ id: editingId, ...form });
        toast.success("Ticket updated!");
      } else {
        await createTicket(form);
        toast.success("Ticket created!");
      }

      setForm({ title: "", description: "", status: "open", priority: "" });
      setEditingId(null);

      // Refresh tickets
      await queryClient.invalidateQueries(["tickets"]);
    } catch (err) {
      toast.error(err.message || "Failed to save ticket.");
    } finally {
      setLoading(false);
    }
  };

  // Delete ticket
  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      toast.success("Ticket deleted");
      await queryClient.invalidateQueries(["tickets"]);
    } catch (err) {
      toast.error(err.message || "Failed to delete ticket.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", status: "open", priority: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#4f46e5]">🎟️ TicketApp</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white text-sm px-2 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="block font-medium">
              Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full border ${
                errors.title ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label htmlFor="status" className="block font-medium">
              Status *
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className={`w-full border ${
                errors.status ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="block font-medium">
              Description <span className="text-[rgba(0,0,0,0.5)] text-sm">(optional)</span>
            </label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className={`w-full border ${
                errors.description ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label htmlFor="priority" className="block font-medium">
              Priority <span className="text-[rgba(0,0,0,0.5)] text-sm">(optional)</span>
            </label>
            <select
              name="priority"
              id="priority"
              value={form.priority}
              onChange={handleChange}
              className={`w-full border ${
                errors.priority ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="text-sm text-red-500">{errors.priority}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : editingId ? <><Save size={18} /> Save Changes</> : <><Plus size={18} /> Add Ticket</>}
            </button>
          </div>
        </form>

        {/* Ticket List */}
        <div className="mt-7 shadow rounded-lg p-8">
          {isError ? (
            <div className="flex justify-center items-center gap-2">
              <p>Failed to load tickets. Please</p>
              <button
                onClick={() => refetch()}
                className="p-1 px-3 text-sm border-2 rounded-xl flex justify-center gap-1.5 bg-white"
              >
                Retry
              </button>
            </div>
          ) : isLoading || isFetching ? (
            <div className="flex gap-1 items-center justify-center">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
              <span className="text-gray-500 text-sm">Loading</span>
            </div>
          ) : tickets?.length === 0 ? (
            <p className="text-gray-500 text-center">No tickets found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  edit={() => setEditingId(ticket.id)}
                  removeTicket={() => handleDelete(ticket.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Tickets;