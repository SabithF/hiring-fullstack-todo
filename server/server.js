import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './database/connection.js'
import todoRoutes from './routers/routes.js'

dotenv.config()


const app = express();
const PORT = process.env.PORT || 8080

//middleware
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TODO API is running" });
});

// Server and DB connection 
connectDb().then(()=> {
    try {
    app.listen(PORT, "0.0.0.0",()=> {
    console.log(`Server running on http://0.0.0.0:${PORT}`)
})
    } catch (error) {
        console.error('Error starting server:', error);
    }
}).catch((error)=> {
    console.error('Error connecting to database:', error);
})

