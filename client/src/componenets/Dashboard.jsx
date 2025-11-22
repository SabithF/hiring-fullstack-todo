import { useEffect, useState } from "react";
import { fetchAllTodos, createNewTodo, updateTodo, completeTodo, deleteTodo } from "../api/todoApi";
import CircularProgress from "./other_components/ProgressBar";
import TodoList from "./TodoList";
import TodoView from "./TodoView";
import TodoEditor from "./TodoEditor";
import Alert from "./other_components/Alert";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";





export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [currId, setcurrId] = useState(null);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(null);


    // UI state
    const [viewTodo, setViewTodo] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);


    // Fetch Todos
    useEffect(() => {
        fetchAllTodos()
            .then(res => setTodos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setError("Something wrong, Failed to load Todos"))
            .finally(() => setLoadingInitial(false));


    }, []);

    // Create new Todos
    const handleCreate = async (data) => {
        // Create temp id for fast update
        const tempId = Date.now();
        const optimistic = { _id: tempId, ...data, done: false };
        setTodos(prev => [optimistic, ...prev]);

        try {
            const res = await createNewTodo(data);
            setTodos(prev => prev.map(t => (t._id === tempId ? res.data : t)));
            showAlert("success", "Todo Created", "Your task was successfully added.");
        } catch {
            setAlert("error", "Failed to Create", "Something went wrong.");
            setTodos(prev => prev.filter(t => t._id !== tempId));
        }

        setEditingTodo(null);
    };

    // update todo
    const handleUpdate = async (id, data) => {
        setcurrId(id);
        const prevTodo = todos;

        setTodos(prev => prev.map(t => (t._id === id ? { ...t, ...data } : t)));

        try {
            const res = await updateTodo(id, data);
            // speed render
            setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
            showAlert("info", "Task Updated", "Changes saved successfully.");


        } catch {
            setTodos(prevTodo);
            setAlert("error", "Failed to update", "Something went wrong.");

        }

        setEditingTodo(null);
        setcurrId(null)
    }

    // Complete task 
    const completeTask = async (id) => {
        setcurrId(id)

        setTodos(prev =>
            prev.map(t => (t._id === id ? { ...t, done: !t.done } : t))
        );

        try {
            const res = await completeTodo(id);
            setTodos(prev =>
                prev.map(t => (t._id === id ? res.data : t))
            );
            showAlert("success", "Task Completed", "Status changed.");

        } catch {
            setAlert("error", "Failed to update", "Something went wrong.");
        }

        setcurrId(null);
    }

    // Deleet handling
    const handleDelete = async (id) => {
        const prevTodo = todos;
        setTodos(prev => prev.filter(t => t._id !== id));

        try {
            await deleteTodo(id);
            showAlert("warning", "Task Deleted", "The task has been removed.");

        } catch {
            setTodos(prevTodo);
            setAlert("error", "Failed to update", "Something went wrong.");
        }
    };

    // Progress count
    const pendingTasks = todos.filter(t => !t.done).length;
    const completedTasks = todos.filter(t => t.done).length;

    const totalTasks = todos.length;

    const progressPercentage = completedTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);


    // Alert helper func
    const showAlert = (variant, title, message = "") => {
        setAlert({ variant, title, message });

        // Auto-hide after 3 seconds (optional)
        setTimeout(() => setAlert(null), 3000);
    };





    return (
        <div className="min-h-screen w-full py-10 md:px-10 px-3 mx-auto bg-gray-900 text-white font-outfit">


            {alert && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
                    <Alert
                        variant={alert.variant}
                        title={alert.title}
                        onClose={() => setAlert(null)}
                    >
                        {alert.message}
                    </Alert>
                </div>
            )}



            <h2 className=""><span className="text-gray-400">Hello</span>, Good Day</h2>
            <h1 className="text-3xl font-poppins tracking-wide text-blue-200 font-semibold">TODO LIST</h1>

            {error && (
                <p className="text-red-400 text-center mb-4">{error}</p>
            )}

            {/* View todos */}
            {viewTodo && (
                <TodoView
                    todo={viewTodo}
                    onClose={() => setViewTodo(null)}
                    onToggle={completeTask}
                    onEdit={(todo) => {
                        setEditingTodo(todo);
                        setViewTodo(null);
                    }}
                />
            )}

            {/* Creaet/ Edit todo */}
            {editingTodo !== null && (
                <TodoEditor
                    initialTodo={editingTodo}
                    onSave={(data) => {
                        if (editingTodo?._id) {
                            handleUpdate(editingTodo._id, data)
                        } else {
                            handleCreate(data);
                        }
                    }} onCancel={() => setEditingTodo(null)} />
            )}

            <div className="flex  gap-4 md:flex-row flex-col">

                <div className=" border-opacity-2 bg-gray-800 rounded-lg 
                py-5 mt-12 w-full flex flex-row justify-between items-center px-4 ">
                    <div className="">
                        <h2 className="font-outfit font-semibold">Task Progress</h2>
                        <p className="text-gray-500"> <span className="text-xl font-semibold">{completedTasks}/{totalTasks}</span> task done</p>
                    </div>
                    <div className="">
                        <CircularProgress progress={progressPercentage} />
                    </div>

                </div>


            </div>

            {/* Todo List */}
            <div className="pt-10">
                {loadingInitial ? (
                    <DotLottieReact
                        src="https://lottie.host/f034d88d-f949-40a1-952d-5faf748922cb/LJWo70sQG4.lottie"
                        loop
                        autoplay
                    />
                ) : (
                    <TodoList
                        todos={todos}
                        onToggle={completeTask}
                        onDelete={handleDelete}
                        onEdit={(todo) => setEditingTodo(todo)}   // Open Editor
                        syncingId={currId}
                        onView={(todo) => setViewTodo(todo)}
                    />
                )}
            </div>


            {/* Floating loading button */}
            {editingTodo === null && viewTodo === null && (
                <button
                    onClick={() => setEditingTodo({})}
                    className="fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-400 
                    text-black px-5 py-3 rounded-full shadow-xl font-bold text-lg"
                >
                    +
                </button>)}


        </div>
    )

}