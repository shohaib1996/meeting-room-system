import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

// parser

app.use(express.json());
app.use(cors());
// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});
app.use(notFound);
app.use(globalErrorHandler);
export default app;
