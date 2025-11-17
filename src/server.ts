import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("App is running");
});

app.listen(3000, () => {
    console.log("The app is running on port 3000");
});
