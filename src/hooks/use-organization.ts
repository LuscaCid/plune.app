import { Organization } from "@/@types/Organization";
import { api } from "@/service/api";
import { useCallback } from "react";

export function userOrganizations() {
  const getUserOrganizations = useCallback(async () => {
    const response = await api.get("/organizations");
    return response.data as { data: Organization[], statusCode: number };
  }, [])
  return {
    getUserOrganizations
  }
}