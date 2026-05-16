import type { 
    NextFunction,
	Request, 
	Response 
} from "express";
import * as authService from "@/modules/auth/auth.service";

/* ROUTE: POST /auth/register
* BODY: 
* {
*     message: string, 
*     statusCode: number, 
*     user: <UserSafe> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const { user, tokens } = await authService.register(req.body);
        res.status(201).json({   
            message: "Account created successfully!", 
            statusCode: 201,
            user, 
            tokens  
        }); 
    } catch (err) {
		next(err);
    }
}
