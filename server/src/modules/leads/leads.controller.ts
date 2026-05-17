import { 
	Request, 
	Response, 
	NextFunction 
} from "express";
import * as leadsService from "@/modules/leads/leads.service";

/* ROUTE: POST /leads
 * RESPONSE:
 * {
 *		message: string,
 *		statusCode: number,
 *		data: <LeadResponse> [REFERENCE: @/types/lead]
 * }
 */
export const createLead = async (req: Request, res: Response, next: NextFunction) => {
	try {
        const data = req.body;
		const lead = await leadsService.createLeadService(data, req.user?.userId!);
		res.status(201).json({
			message: "Lead created successfully!",
			statusCode: 201,
			data: lead
		})
	} catch (err) {
		next(err)
	}
}
