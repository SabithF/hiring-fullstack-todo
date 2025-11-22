import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItems";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  syncingId,
  onView,
}) {
  if (!todos.length) {
    return (
      <p className="text-center text-slate-400 mt-6">
        No tasks yet — add one!
      </p>
    );
  }

  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <motion.div layout className="space-y-8">
      {/* Pending */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-slate-400 text-xs uppercase mb-2 tracking-wide">
            Pending ({pending.length})
          </h2>

          <div className="space-y-3">
            <AnimatePresence>
              {pending.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    syncing={syncingId === todo._id}
                    onView={() => onView(todo)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-slate-400 text-xs uppercase mb-2 tracking-wide">
            Completed ({completed.length})
          </h2>

          <div className="space-y-3">
            <AnimatePresence>
              {completed.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    syncing={syncingId === todo._id}
                    onView={() => onView(todo)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </motion.div>
  );
}
