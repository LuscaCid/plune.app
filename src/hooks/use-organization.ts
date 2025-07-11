import { Organization } from "@/@types/Organization";
import { Roles } from "@/@types/user";
import { SaveOrgDTO } from "@/lib/DTO/organization.dto";
import { api } from "@/service/api";
import { useCallback } from "react";
interface UserOrganizationsReturn {
  id: number;
  role: Roles;
  organization: Organization
}
export function userOrganizations() {
  const getUserOrganizations = useCallback(async () => {
    const response = await api.get("/organizations");
    return response.data.data as UserOrganizationsReturn[];
  }, []);

  const saveOrganization = useCallback(async (data: SaveOrgDTO) => {
    if (data.id) {
      const response = await api.put("/organizations", data);
      return response.data;
    }
    const response = await api.post("/organizations", data);
    return response.data;
  }, [])

  return {
    getUserOrganizations,
    saveOrganization
  }
}