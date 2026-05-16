import "dotenv/config";
import express from "express";
import connectDB from "@/config/db";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";

import authRouter from "@/modules/auth/auth.routes";
import { errorHandler } from "@/middlewares/global.errorHandler";

const PORT = process.env.PORT;
if(!PORT) throw new Error("PORT is not defined");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});
