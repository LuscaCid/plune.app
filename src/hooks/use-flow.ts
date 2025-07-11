import type { Flow } from "@/@types/Flow";
import { api } from "@/service/api"
import { useUserStore } from "@/store/user";
import { useCallback } from "react"
export interface TableParams {
  page: number;
}
export interface GetFlowReturn {
  data: Flow[];
  count: number;
  statusCode: number;
}
export function useFlow() {
  const BASE_PATH = "/flows";
  const selectedOrganization = useUserStore(state => state.selectedOrganization);

  const getOrganizationInstancesFlows = useCallback(async (payload: TableParams) => {
    if (selectedOrganization) {
      const params = new URLSearchParams();

      params.append("page", payload.page.toString());
      params.append("limit", (10).toString());
      params.append("orgId", selectedOrganization.id!.toString());

      const response = await api.get(BASE_PATH + "/instance", { params });
      return response.data as GetFlowReturn;
    }
  }, [selectedOrganization]);

  const getOrganizationTemplateFlows = useCallback(async (payload: TableParams) => {
    if (selectedOrganization) {
      console.log(selectedOrganization);
      const params = new URLSearchParams();

      params.append("page", payload.page.toString());
      params.append("pageSize", (10).toString());
      params.append("orgId", selectedOrganization.id!.toString());

      const response = await api.get(BASE_PATH + "/template", { params });
      return response.data as GetFlowReturn;
    }
    return []
  }, [selectedOrganization]);

  return {
    getOrganizationInstancesFlows,
    getOrganizationTemplateFlows
  }
}