import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        description:{
            type: String,
            default: "",
            trim: true
        },
        done: {
            type: Boolean,
            default:false
        }
        
    },
    {timestamps: true}
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;