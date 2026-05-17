import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import connectDB from "@/config/db";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";

import authRouter from "@/modules/auth/auth.routes";
import leadsRouter from "@/modules/leads/leads.routes";
import { errorHandler } from "@/middlewares/global.errorHandler";

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV || !["production", "development", "test"].includes(NODE_ENV)) 
	throw new Error("Missing required env var: NODE_ENV");

/* Global rate limiter
 * @description This is a global rate limiter that will be applied to all routes
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { statusCode: 429, message: "Too many requests, please try again later." }
});

/* Auth rate limiter
 * @description This is a rate limiter that will be applied to all auth routes
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: { statusCode: 429, message: "Too many auth attempts, please try again later." }
});

const app = express();

app.use(cors({
	origin: CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

if(NODE_ENV === "production") app.use(globalLimiter);

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if(process.env.NODE_ENV === "production") 
	app.use("/api/auth", authLimiter, authRouter);
else app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);

app.use(errorHandler);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`[+] Server is running on port ${PORT}!`);
		console.log(`[+] Docs available at: http://localhost:${PORT}/api/docs`);
        console.log(`[+] Client available at: ${CLIENT_URL}`);
		console.log(`[+] Environment: ${NODE_ENV}`);
		if(NODE_ENV !== "production") 
			console.log(`[!] Rate Limiter is disabled`);
	});
});
