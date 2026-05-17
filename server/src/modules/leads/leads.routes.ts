import { Router } from "express";
import authentication from "@/middlewares/global.authentication";
import validator from "@/middlewares/global.validator";
import * as leadsController from "@/modules/leads/leads.controller";
import { CreateLeadSchema } from "@/types/lead";

const router = Router();

router.use(authentication);

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: Lead management operations
 */

/**
 * @swagger
 * /leads:
 *   post:
 *     tags: [Leads]
 *     summary: Create a new lead
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - source
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               status:
 *                 type: string
 *                 enum: [new, contacted, qualified, lost]
 *               source:
 *                 type: string
 *                 enum: [website, instagram, referral]
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/",
	validator(CreateLeadSchema),
	leadsController.createLead
);

export default router;
