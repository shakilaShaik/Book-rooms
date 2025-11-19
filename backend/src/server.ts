import express, { Request, Response } from "express";
import { bookingRouter } from "./routes/bookingRoutes";
import { seedRooms } from "./data/roomSeed";
import { rooms } from "./data/roomSeed";
import cors from 'cors'
import { adminRouter } from "./routes/adminRoutes";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
  }));
  
app.use(express.json())

seedRooms()
app.use("/api", bookingRouter)
app.use("/admin",adminRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("App is running");
});
app.get("/rooms",(req,res)=>{
    res.status(200).json({meetingRooms:rooms})
})

app.listen(3000, () => {
    console.log("The app is running on port 3000");
});
