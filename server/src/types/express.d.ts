import { JwtPayload } from "jsonwebtoken";
import { AccessTokenPayload } from "@/types/auth";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload;
		}
    }
}
