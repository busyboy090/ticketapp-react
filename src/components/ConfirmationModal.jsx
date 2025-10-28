import React, { useEffect, useState } from 'react'

function ConfirmationModal({open, close, title, deleteTicket}) {
    const [message, setMessage] = useState("");

    if(open) {
        return (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                    <p className="mb-6">Are you sure you want to delete this ticket? This action cannot be undone.</p>

                    <div className='mb-3'>
                        <p>To confirm, type "<span className='text-[rgba(0,0,0,0.5)]'>{title}</span>" in the box below</p>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='h-10 border w-full rounded-lg p-2'/>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type='button' onClick={() => {
                            close()
                            setMessage("")
                        }} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type='button' disabled={ message !== title } onClick={() => {
                            deleteTicket(message);
                            setMessage("")
                        }} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return  null
}

export default ConfirmationModal