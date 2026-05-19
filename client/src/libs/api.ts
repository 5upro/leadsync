import type { Lead, LeadFormData } from "@/types/lead";
import type { PaginatedResponse, LeadQuery } from "@/types/api";
import type { AuthPayload, LoginCredentials, RegisterCredentials } from "@/types/auth";
import type { RefreshTokenPayload } from "@/types/token";
import api from "@/libs/axios";

/* ── Auth ── */
export async function login(creds: LoginCredentials): Promise<AuthPayload> {
    const { data } = await api.post<AuthPayload>("/auth/login", creds);
    return data;
}

export async function register(creds: RegisterCredentials): Promise<AuthPayload> {
    const { data } = await api.post<AuthPayload>("/auth/register", creds);
    return data;
}

export async function refreshToken(payload: RefreshTokenPayload): Promise<AuthPayload> {
    const { data } = await api.post<AuthPayload>("/auth/refresh", payload);
    return data;
}

export async function logout(payload: RefreshTokenPayload): Promise<void> {
    await api.post("/auth/logout", payload);
}

/* ── Leads ── */
export async function getLeads(query: LeadQuery): Promise<PaginatedResponse<Lead>> {
    const params = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== "" && v !== undefined)
    );
    const { data } = await api.get<PaginatedResponse<Lead>>("/leads", { params });
    return data;
}

export async function getLeadById(id: string): Promise<Lead> {
    const { data } = await api.get<Lead>(`/leads/${id}`);
    return data;
}

export async function createLead(payload: LeadFormData): Promise<Lead> {
    const { data } = await api.post<Lead>("/leads", payload);
    return data;
}

export async function updateLead(id: string, payload: Partial<LeadFormData>): Promise<Lead> {
    const { data } = await api.patch<Lead>(`/leads/${id}`, payload);
    return data;
}

export async function deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
}

export async function exportLeadsCSV(query: Omit<LeadQuery, "page" | "limit">): Promise<Blob> {
    const params = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== "" && v !== undefined)
    );
    const { data } = await api.get<Blob>("/leads/export/csv", {
        params,
        responseType: "blob",
    });
    return data;
}
