import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function TodoView({ todo, onClose, onToggle, onEdit }) {
  if (!todo) return null;

  // BG scroll disablibg wheb model is active 
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-full max-w-md shadow-xl"
        >
          <h2 className="text-xl font-bold text-white mb-3">Task Details</h2>

          <p className="text-lg font-semibold text-sky-300 mb-2">
            {todo.title}
          </p>

          {todo.description && (
            <p className="text-slate-300 mb-4">{todo.description}</p>
          )}

          <p className="text-sm mb-4">
            Status:{" "}
            <span
              className={
                todo.done
                  ? "text-emerald-400 font-medium"
                  : "text-yellow-400 font-medium"
              }
            >
              {todo.done ? "Completed" : "Pending"}
            </span>
          </p>

          {/* BTNS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                onToggle(todo._id)
                setTimeout(() => onClose(), 150); 
              }
              }
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
            >
              {todo.done ? "Mark as Pending" : "Mark as Complete"}
            </button>

            <button
              onClick={() => onEdit(todo)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
            >
              Edit
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
