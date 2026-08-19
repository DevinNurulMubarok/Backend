import express, { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import { userRouter } from "./src/routes/userRouter.js";
 
const app = express();
const PORT = 8000; 

app.use(express.json());

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to my API",
  });
});
 
app.use("/users", userRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(
  (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("Error:", err);

    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
      message,
      ...(process.env.NODE_ENV === "development" && {
        error: err,
      }),
    });
  }
);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on PORT ${PORT}`));
});