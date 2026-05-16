import { 
	generateRefreshToken,
	generateAccessToken,
    hashToken,
} from "@/utils/token";
import { 
	hashPassword, 
} from "@/utils/password";
import { AppError } from "@/utils/error";
import type { 
	RegisterPayload, 
} from "@/types/auth";
import { User } from "@/models/User";
import { RefreshToken } from "@/models/RefreshToken";


export const register = async (data: RegisterPayload) => {
	const { name, email, password } = data;
	const existing = await User.exists({ email });
	if(existing) throw new AppError("Email already in use", 409)

	const hashed = await hashPassword(password);

	const user = await User.create({
		name,
		email,
		passwordHash: hashed,
		role: "sales"
	});

	const accessToken = generateAccessToken({ 
		userId: user._id.toString(), 
		role: user.role 
	});
	const refreshToken = generateRefreshToken({ 
		userId: user._id.toString() 
	});

	await RefreshToken.create({
		userId: user._id,
		tokenHash: hashToken(refreshToken),
		isRevoked: false
	});

	return {
		user: {
			name: user.name,
			email: user.email,
			role: user.role
		},
		tokens: {
			accessToken,
			refreshToken
		}
	};
}
