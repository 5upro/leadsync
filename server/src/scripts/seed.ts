import "dotenv/config";
import mongoose from "mongoose";
import { Lead } from "@/models/Lead";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI!;

const users = [
	{
		name: "Admin User",
		email: "admin@leadsync.com",
		password: "pass123456",
		role: "admin",
	},
	{
		name: "Sales User",
		email: "sales@leadsync.com",
		password: "pass098765",
		role: "sales",
	},
];

const leads = [
	{ name: "Rahul Sharma",   email: "rahul@example.com",   status: "new",       source: "website"   },
	{ name: "Priya Mehta",    email: "priya@example.com",   status: "contacted", source: "instagram" },
	{ name: "Arjun Singh",    email: "arjun@example.com",   status: "qualified", source: "referral"  },
	{ name: "Sneha Patel",    email: "sneha@example.com",   status: "lost",      source: "website"   },
	{ name: "Vikram Nair",    email: "vikram@example.com",  status: "new",       source: "instagram" },
	{ name: "Ananya Roy",     email: "ananya@example.com",  status: "contacted", source: "referral"  },
	{ name: "Kabir Das",      email: "kabir@example.com",   status: "qualified", source: "website"   },
	{ name: "Meera Iyer",     email: "meera@example.com",   status: "new",       source: "instagram" },
	{ name: "Rohan Gupta",    email: "rohan@example.com",   status: "lost",      source: "referral"  },
	{ name: "Tanya Bose",     email: "tanya@example.com",   status: "contacted", source: "website"   },
	{ name: "Aarav Joshi",    email: "aarav@example.com",   status: "qualified", source: "instagram" },
	{ name: "Divya Krishnan", email: "divya@example.com",   status: "new",       source: "referral"  },
	{ name: "Amit Verma",     email: "amit@example.com",    status: "contacted", source: "website"   },
	{ name: "Nisha Reddy",    email: "nisha@example.com",   status: "lost",      source: "instagram" },
	{ name: "Siddharth Rao",  email: "siddharth@example.com", status: "qualified", source: "referral" },
];

async function seed() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("[+] Connected to MongoDB");

		// Clear existing data
		await User.deleteMany({});
		await Lead.deleteMany({});
		console.log("[+] Cleared existing data");

		// Seed users
		const hashedUsers = await Promise.all(
			users.map(async (u) => ({
				name: u.name,
				email: u.email,
				role: u.role,
				passwordHash: await bcrypt.hash(u.password, 10),
			}))
		);
		const createdUsers = await User.insertMany(hashedUsers);
		console.log(`[+] Seeded ${createdUsers.length} users`);

		// Seed leads — assigned to admin
		const adminUser = createdUsers.find((u) => u.role === "admin");
		const seededLeads = leads.map((l, i) => ({
			...l,
			createdBy: adminUser!._id,
			createdAt: new Date(Date.now() - i * 86_400_000 * 2),
		}));
		const createdLeads = await Lead.insertMany(seededLeads);
		console.log(`[+] Seeded ${createdLeads.length} leads`);

		console.log("\n Demo credentials:");
		console.log("  Admin  → admin@leadsync.com  / pass123456");
		console.log("  Sales  → sales@leadsync.com  / pass098765");

		process.exit(0);
	} catch (e) {
		console.error("[-] Seed failed:", e);
		process.exit(1);
	}
}

seed();
