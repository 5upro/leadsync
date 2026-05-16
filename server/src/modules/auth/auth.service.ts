import { 
	generateRefreshToken,
	generateAccessToken,
    hashToken,
    verifyRefreshToken,
} from "@/utils/token";
import { 
	hashPassword,
    verifyPassword, 
} from "@/utils/password";
import { AppError } from "@/utils/error";
import type { 
	RegisterPayload, 
    LoginPayload,
} from "@/types/auth";
import type { UserSafe } from "@/types/user";
import { User } from "@/models/User";
import { RefreshToken } from "@/models/RefreshToken";

export const register = async (data: RegisterPayload) => {
	const { name, email, password } = data;
	const existing = await User.exists({ email });
	if(existing) throw new AppError("Email already in use", 409);

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

	const userSafe: UserSafe = {
        name: user.name,
        email: user.email,
        role: user.role
	};

	return {
		user: userSafe,
		tokens: {
			accessToken,
			refreshToken
		}
	};
}

export const login = async (data: LoginPayload) => {
	const { email, password } = data;
	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new AppError("Invalid credentials", 401);

	const isValid = await verifyPassword(password, user.passwordHash);
	if (!isValid) throw new AppError("Invalid credentials", 401);

	const accessToken = generateAccessToken({
		userId: user._id.toString(),
		role: user.role
	});
	const refreshToken = generateRefreshToken({
		userId: user._id.toString()
	});

	await RefreshToken.updateMany(
		{ userId: user._id },
		{ isRevoked: true }
	);

	await RefreshToken.create({
		userId: user._id,
		tokenHash: hashToken(refreshToken),
		isRevoked: false
	});

	const userSafe: UserSafe = {
        name: user.name,
        email: user.email,
        role: user.role
	};

	return {
		user: userSafe,
		tokens: {
			accessToken,
			refreshToken
		}
	};
}

export const refreshToken = async (token: string) => {
	const payload = verifyRefreshToken(token);
	const hashed = hashToken(token);

	const tokenDoc = await RefreshToken.findOne({
		userId: payload.userId,
		tokenHash: hashed,
		isRevoked: false
	});
	if(!tokenDoc) throw new AppError("Invalid refresh token", 401)

	const user = await User.findById(payload.userId)
	if (!user) throw new AppError("User not found", 404)

	tokenDoc.isRevoked = true
	await tokenDoc.save();

	const newAccessToken = generateAccessToken({
		userId: user._id.toString(),
		role: user.role
	});
	const newRefreshToken = generateRefreshToken({
		userId: user._id.toString()
	});

	await RefreshToken.create({
		userId: user._id,
		tokenHash: hashToken(newRefreshToken),
		isRevoked: false
	});

	const userSafe: UserSafe = {
        name: user.name,
        email: user.email,
        role: user.role
	};

	return {
		user: userSafe,
		tokens: {
			newAccessToken,
			newRefreshToken
		}
	};
}

export const logout = async (refreshToken: string) => {
	const hashed = hashToken(refreshToken)

	const tokenDoc = await RefreshToken.findOne({ token: hashed })
	if (!tokenDoc) throw new AppError("Invalid refresh token", 401)

	tokenDoc.isRevoked = true
	await tokenDoc.save()
}
