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

/* ROUTE: POST /auth/login
* BODY: 
* {
*     message: string, 
*     statusCode: number, 
*     user: <UserSafe> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {  
		const { user, tokens } = await authService.login(req.body);
		res.status(200).json({   
			message: "Login successful!", 
            statusCode: 200,
			user,  
			tokens  
		}); 
	} catch (err) {
		next(err);
	}
}

/* ROUTE: POST /auth/refresh
* BODY: 
* {
*     message: string, 
*     statusCode: number, 
*     user: <UserSafe> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
	try {  
		const { token } = req.body;  
		const { user, tokens } = await authService.refreshToken(token);
		res.status(200).json({  
			message: "Token refreshed successfully!", 
            statusCode: 200,
			user,  
			tokens 
		});
	} catch (err) {
		next(err);
	}
}
