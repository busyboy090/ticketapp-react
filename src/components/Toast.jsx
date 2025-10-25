import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded-md shadow-md fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  );
}

export default Toast;