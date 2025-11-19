import express, { Request, Response } from "express";
import { bookingRouter } from "./routes/bookingRoutes";
import { seedRooms } from "./data/roomSeed";

const app = express();
app.use(express.json())
seedRooms()
app.use("/api",bookingRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("App is running");
});

app.listen(3000, () => {
    console.log("The app is running on port 3000");
});
