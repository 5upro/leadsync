import { JwtPayload } from "jsonwebtoken";
import { AccessTokenPayload } from "@/types/token";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload;
		}
    }
}
