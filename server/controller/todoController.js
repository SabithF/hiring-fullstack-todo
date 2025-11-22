import Todo from "../models/todo.js";


//GET  Get all Todo

export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);

    } catch (error) {
        console.error("Error in fetchning todods:", error);
        res.status(500).json({ error: "Failed to fetch todo list" })

    }
};


// POST  - Create new todo
export const createTodo = async (req, res) => {
    try {
        const { title, description = "" } = req.body;

        // validdate empty input including spaces
        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title can't be empty" });
        }
        const todo = await Todo.create({ title: title.trim(), description });
        res.status(201).json(todo);
    } catch (error) {
        console.error("Error creating todo", error);
        res.status(500).json({ error: "Failed to create a new todo" })


    }
}

// PUT Updating Todo
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title can't be empty" });
        }
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title: title.trim(), description },
            { new: true, runValidators: true }
        );

        if (!todo) return res.status(404).json({ error: "Todo not found" })
        res.json(todo);

    } catch (error) {
        console.error("Error updating todo:", err);
        res.status(500).json({ error: "Failed to update" });

    }
};


// PATCH complete todo
export const completeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ error: "Todo not found" })
        todo.done = !todo.done;
        await todo.save();

        res.json(todo);

    } catch (error) {
        console.error("Error completing task:", err);
        res.status(500).json({ error: "Failed to update the task as complete" });

    }
};

// DELETE Deletetask

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo) return res.status(404).json({error: "Todo not found"})
        
        res.json({message: "Todo deleted successfully"})

    } catch (error) {
        console.error("Error deletng todo:", error);
        res.status(500).json({error: " Failed deleting toto"})
        
    }
}
