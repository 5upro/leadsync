import { 
	Request, 
	Response, 
	NextFunction 
} from "express";
import * as leadsService from "@/modules/leads/leads.service";
import { LeadsQuerySchema } from "@/types/lead";
import { AppError } from "@/utils/error";

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

/* ROUTE: GET /leads
 * QUERY:
 * {
 *		page?: number,
 *		limit?: number,
 *		status?: LeadStatus,
 *		source?: LeadSource,
 *		search?: string,
 *		sort?: "latest" | "oldest"
 * }
 * RESPONSE:
 * {
 *		message: string,
 *		statusCode: number,
 *		data: <LeadResponse[]> [REFERENCE: @/types/lead],
 *		pagination: {
 *			total: number,
 *			page: number,
 *			limit: number,
 *			totalPages: number,
 *			hasNextPage: boolean,
 *			hasPrevPage: boolean
 *		}
 * }
 */
export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = LeadsQuerySchema.safeParse(req.query)
        if (!parsed.success) throw new AppError(parsed.error.issues[0].message, 400)

        const { leads, pagination } = await leadsService.getLeadsService(parsed.data)
        res.status(200).json({
            message: "Leads fetched successfully!",
            statusCode: 200,
            data: leads,
            pagination
        })
    } catch (err) {
        next(err)
    }
}
