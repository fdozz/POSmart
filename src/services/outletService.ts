import type { Outlet } from "@/types/posmart";
import { apiListRequest, apiRequest, jsonBody, queryString } from "./api";

export const outletService = {
  list(filters?: { userId?: string; page?: number; limit?: number }) {
    return apiListRequest<Outlet>(`/api/outlets${queryString(filters)}`);
  },

  detail(outletId: string) {
    return apiRequest<Outlet>(`/api/outlets/${outletId}`);
  },

  create(input: Pick<Outlet, "nama" | "alamat"> & { userId?: string }) {
    return apiRequest<Outlet>("/api/outlets", {
      method: "POST",
      body: jsonBody({ nama: input.nama, alamat: input.alamat }),
    });
  },

  update(outletId: string, input: Partial<Pick<Outlet, "nama" | "alamat">>) {
    return apiRequest<Outlet>(`/api/outlets/${outletId}`, {
      method: "PATCH",
      body: jsonBody(input),
    });
  },

  remove(outletId: string) {
    return apiRequest<{ outletId: string }>(`/api/outlets/${outletId}`, { method: "DELETE" });
  },
};
