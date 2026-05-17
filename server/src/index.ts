import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "@/config/db";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";

import authRouter from "@/modules/auth/auth.routes";
import leadsRouter from "@/modules/leads/leads.routes";
import { errorHandler } from "@/middlewares/global.errorHandler";

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const app = express();

app.use(cors({
	origin: CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);

app.use(errorHandler);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`[+] Server is running on port ${PORT}!`);
		console.log(`[+] Docs available at http://localhost:${PORT}/api/docs`);
        console.log(`[+] Client available at ${CLIENT_URL}`);
	});
});
