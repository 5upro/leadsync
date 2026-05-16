import { Router } from "express";
import validator from "@/middlewares/global.validator";
import * as authController from "@/modules/auth/auth.controller";
import { 
    RegisterPayloadSchema, 
    LoginPayloadSchema,
} from "@/types/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & account activation
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", 
    validator(RegisterPayloadSchema),
    authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with username or email
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials 
 *       500:
 *         description: Internal server error 
 */
router.post("/login", 
    validator(LoginPayloadSchema),
	authController.login
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New tokens issued
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh", 
	authController.refreshToken
);

export default router;
