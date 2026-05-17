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

/**
 * @swagger
 * /leads:
 *   get:
 *     tags: [Leads]
 *     summary: Get all leads with filtering, search, sort and pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Records per page (default 10)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, contacted, qualified, lost]
 *         description: Filter by status (optional)
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [website, instagram, referral]
 *         description: Filter by source (optional)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email (optional)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, oldest]
 *           default: latest
 *         description: Sort order (default latest)
 *     responses:
 *       200:
 *         description: Leads fetched successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", 
	leadsController.getLeads
);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     tags: [Leads]
 *     summary: Get a lead by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead fetched successfully
 *       400:
 *         description: Invalid lead ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id",
	leadsController.getLeadById
);

export default router;
