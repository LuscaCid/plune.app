import { Organization } from "@/@types/Organization";
import { SaveOrgDTO } from "@/lib/DTO/organization.dto";
import { api } from "@/service/api";
import { useUserStore } from "@/store/user";
import { useCallback } from "react";

export function userOrganizations() {
  const setOrganizations = useUserStore(state => state.setOrganizations);

  const getUserOrganizations = useCallback(async () => {
    const response = await api.get("/organizations");
    const data = response.data as { data: Organization[], };
    setOrganizations(data.data);
    return data;

  }, [setOrganizations]);

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