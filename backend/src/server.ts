import express, { Request, Response } from "express";
import { bookingRouter } from "./routes/bookingRoutes";
import { seedRooms } from "./data/roomSeed";
import { rooms } from "./data/roomSeed";
import cors from 'cors'
import { adminRouter } from "./routes/adminRoutes";
import * as dotenv from "dotenv";  // <- notice the `* as`
dotenv.config();                  // <- call config(), 
const app = express();
const Frontend_url = process.env.FRONTEND_URL
const port =process.env.PORT
app.use(cors({
    origin: Frontend_url, // your frontend URL
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

app.listen(port, () => {
    console.log(`The app is running on port ${port} `);
});
