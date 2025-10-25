import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Trash2, Edit3, Save } from "lucide-react";
import { getTicketsStats, getAllTickets, createTicket, editTicket, getTicketById } from "@/services/ticketService.js"
import TicketCard from "../components/TicketCard";

function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(getAllTickets() || []);
  const [newTicket, setNewTicket] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {

    if(editingId) {
      setForm(getTicketById(editingId))
    }

  },[editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name == "title") {
      if (!value.trim()) {
        setErrors(prev => ({...prev, [name]: "Title is required."}))
      }else {
        setErrors(prev => ({...prev, [name]: ""}))
      }
    }

    if(name == "status") {
      if (!value.trim()) {
        setErrors(prev => ({...prev, [name]: "Status is required."}))
      }
      else if (!["open", "in_progress", "closed"].includes(value)) {
        setErrors(prev => ({...prev, [name]: "Status must be open, in progress, or closed."}))
      }else {
        setErrors(prev => ({...prev, [name]: ""}))
      }
    }


    if(name == "description") {
      if (value && value.length > 200) {
        setErrors(prev => ({...prev, [name]: "Description must be under 200 characters"}))
      }
      else setErrors(prev => ({...prev, [name]: ""}))
    }

    if(name == "priority") {
      if (value && !["low", "medium", "high"].includes(value)){
        setErrors(prev => ({...prev, [name]: "Priority must be low, medium, or high."}))
      }
      else setErrors(prev => ({...prev, [name]: ""}))
    }
    
    setForm({ ...form, [name]: value });
  };

  // ✅ Load tickets from localStorage
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      navigate("/auth/login");
      return;
    }

    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, [navigate]);


  // ✅ Validation function
  const validate = (data) => {
    const newErrors = {};

    if (!data.title.trim()) newErrors.title = "Title is required.";

    if (!data.status.trim())
      newErrors.status = "Status is required.";
    else if (!["open", "in_progress", "closed"].includes(data.status))
      newErrors.status = "Status must be open, in progress, or closed.";


    if (data.description && data.description.length > 200)
      newErrors.description = "Description must be under 200 characters.";

    if (data.priority && !["low", "medium", "high"].includes(data.priority))
      newErrors.priority = "Priority must be low, medium, or high.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Create new ticket
  const addTicket = (e) => {
    e.preventDefault();

    if (!validate(form)) {
      return;
    }
    
    if(editingId) {
      editTicket({
        id: editingId,
        ...form
      })
      setTickets(getAllTickets());
      setForm({
        title: "",
        description: "",
        status: "open",
        priority: "",
      })
      setEditingId(null)
      toast.success("Ticket updated successfully!");
    }else {
      createTicket({
        ...form
      })
      setTickets(getAllTickets());
      setForm({
        title: "",
        description: "",
        status: "open",
        priority: "",
      })
      toast.success("Ticket created successfully!");
    }
  };

  // ✅ Delete ticket
  const handleDelete = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
    toast.info("Ticket deleted");
  };

  // ✅ Start editing
  const handleEdit = (id, title) => {
    setEditing(id);
    setEditedTitle(title);
  };

  // ✅ Save edited ticket
  const handleSave = (id) => {
    setTickets(
      tickets.map((t) =>
        t.id === id ? { ...t, title: editedTitle.trim() } : t
      )
    );
    setEditing(null);
    toast.success("Ticket updated!");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      status: "open",
      priority: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#4f46e5]">Ticket Management</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-4 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Create form */}
        <form onSubmit={addTicket} className="space-y-2">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="block font-medium">Title *</label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full border ${
                errors.title ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
              aria-describedby="title-error"
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label htmlFor="status" className="block font-medium">Status *</label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className={`w-full border ${
                errors.status ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
              aria-describedby="status-error"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <p id="status-error" className="text-sm text-red-500">{errors.status}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="block font-medium">Description <span className="text-[rgba(0,0,0,0.5)] text-sm">(optional)</span></label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className={`w-full border ${
                errors.description ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 outline-none`}
              aria-describedby="description-error"
            />
            {errors.description && (
              <p id="description-error" className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label htmlFor="priority" className="block font-medium">Priority <span className="text-[rgba(0,0,0,0.5)] text-sm">(optional)</span></label>
            <select
              name="priority"
              id="priority"
              value={form.priority}
              onChange={handleChange}
              className={`w-full border ${
                errors.priority ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2"
              } rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4e46e5e1] outline-none`}
              aria-describedby="priority-error"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p id="priority-error" className="text-sm text-red-500">{errors.priority}</p>
            )}
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

            {/* Submit button */}
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-4 py-2 rounded-lg"
            >
              {editingId ? <Save size={18} /> : <Plus size={18} />}
              {editingId ? "Save Changes" : "Add Ticket"}
            </button>
          </div>
        </form>

        {/* Ticket List */}
        <div className="mt-7 shadow rounded-lg p-8">
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">No tickets found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {
                tickets.map((ticket, index) => (
                  <TicketCard key={index} ticket={ticket} edit={(id) => setEditingId(id)} />
                ))
              }
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Tickets;