import express from "express";
import { Request, Response } from "express";
import { userRouter } from "./src/routes/userRouter.js";
import { ApiError } from "./src/utils/api-error.js";

const app = express();

const PORT = 8000;

app.use(express.json()); // agar bisa menerima req.body
  
app.get("/api", (_req, res) => {
  res.status(200).send("Welcome to my API");
});

// entry point
app.use("/users", userRouter);

// ✅ Remove the empty app.use(); line above
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: "route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});