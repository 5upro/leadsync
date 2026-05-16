import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/error";

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			statusCode: err.statusCode,
			message: err.message,
		});
	}
	console.error(err);
	res.status(500).json({
		statusCode: 500,
		message: "Internal server error",
	});
};
