import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

function TicketCard({ ticket, edit, removeTicket }) {
  const [show, setShow] = useState(true);
  const [showDeleteModal, setShowDeletaModal] = useState(false)

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behaviour: "smooth"
    })
  }

  const deleteTicket = (title) => {
    if(title === ticket.title) {
      removeTicket(ticket.id)
      setShow(false)
      setShowDeletaModal(false)
    }
  }

  if (show) {
    return (
      <li className="bg-white p-4 rounded-xl shadow flex flex-col">
        <div className="flex justify-between items-center w-full">
          {/* title */}
          <h4 className="font-bold">{ticket.title}</h4>

          <div className="flex gap-3">
            <button type="button" onClick={() => {
              edit(ticket.id)
              scrollTop()
            }}>
              <Edit3 size={15} className="text-[#4e46e5e1]" />
            </button>
            <button onClick={() => setShowDeletaModal(true)} type="button">
              <Trash2 size={15} className="text-[red]" />
            </button>
          </div>
        </div>

        <ConfirmationModal open={showDeleteModal} close={() => setShowDeletaModal(false)} deleteTicket={(title) => deleteTicket(title)} title={ticket.title} />

        <div className="space-y-2 mt-2">
          {ticket.description && (
            <p className="text-sm">
              Description:{" "}
              <span className="text-[0.7rem]">{ticket.description}</span>
            </p>
          )}

          {/* status */}
          <div className="flex items-center justify-between">
            <p className="text-sm">Status</p>
            <div className={`${ticket.status === "open" ? "bg-green-100 text-green-700" : ticket.status === "in_progress" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"} p-2 rounded-4xl text-[0.7rem] font-bold`}>
              { ticket.status == "in_progress" ? "in progess" : ticket.status }
            </div>
          </div>

          {/* Priority */}
          {ticket.priority && (
            <div className="flex items-center justify-between">
              <p className="text-sm">Priority</p>
              <div className={`${ticket.priority === "high" ? "bg-green-100 text-green-700" : ticket.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"} p-2 rounded-4xl text-[0.7rem] font-bold`}>
                {ticket.priority}
              </div>
            </div>
          )}

            <p className="text-sm">
                Created At:{" "}
                <span className="text-[0.7rem]">{ticket.createdAt}</span>
            </p>
        </div>
      </li>
    );
  }

  return null;
}

export default TicketCard;
