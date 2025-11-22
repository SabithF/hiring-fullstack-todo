import { useState, useEffect } from "react";

export default function TodoEditor({ initialTodo, onSave, onCancel }) {
  const isEditing = Boolean(initialTodo?._id);

  const [title, setTitle] = useState(initialTodo?.title || "");
  const [description, setDescription] = useState(initialTodo?.description || "");
  const [error, setError] = useState("");

  // ESC key closes modal
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onSave({ title, description });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}   
    >
      <div
        className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl w-[90%] max-w-md animate-fadeIn"
        onClick={(e) => e.stopPropagation()}  
      >
        <h2 className="text-xl font-bold text-white mb-4">
          {isEditing ? "Edit Task" : "New Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description (optional)"
            rows="3"
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-400 text-black px-4 py-2 font-semibold rounded-lg w-full"
            >
              {isEditing ? "Update" : "Create"}
            </button>

            <button
              type="button"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
