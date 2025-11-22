import { motion } from "framer-motion";
import React from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit, syncing, onView }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`p-4 bg-slate-900/60 border border-slate-800 rounded-xl transition 
                  ${todo.done ? "opacity-60" : "opacity-100"}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.div
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.08 }}
          className="mt-1"
        >
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(todo._id);
            }}
            className="accent-sky-500 cursor-pointer"
          />
        </motion.div>



        <div
          className="flex-1 cursor-pointer"
          onClick={() => onView(todo)}
        >
          <h3
            className={`font-semibold text-white ${todo.done ? "line-through text-slate-400" : ""
              }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="text-slate-300 text-sm mt-1">{todo.description}</p>
          )}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2 ml-2">

          {/* Edit icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo);
            }}
            className="p-2 rounded-lg hover:bg-slate-800 text-sky-300 transition"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487l3.651 3.651-9.9 9.9H6.964v-3.651l9.9-9.9z" />
            </svg>
          </button>

          {/* Delete icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo._id);
            }}
            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>
      </div>

      {syncing && (
        <span className="text-xs text-sky-300 italic mt-2 block">Saving...</span>
      )}
    </motion.div>
  );
}
