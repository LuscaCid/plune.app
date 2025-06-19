import type { Flow } from "@/@types/Flow";
import { api } from "@/service/api"
import { useCallback } from "react"

export function useFlow() {
  // const BASE_PATH = "/flow";

  const getOrganizationInstancesFlows = useCallback(async () => {

    const response = await api.get("flowsInstances");
    const data = response.data;
    console.log(data);

    return response.data as Flow[];
  }, []);
  const getOrganizationModelFlows = useCallback(async () => {

    const response = await api.get("flowsModels");

    return response.data as Flow[];
  }, []);

  return {
    getOrganizationInstancesFlows,
    getOrganizationModelFlows
  }
}