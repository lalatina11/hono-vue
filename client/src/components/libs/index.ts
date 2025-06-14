import { apiRequest } from "@/helpers"

export const handleLogoutAdminExp = async () => {
    await apiRequest.post("/api/admin/logout")
    location.replace("/auth?type=login")
}