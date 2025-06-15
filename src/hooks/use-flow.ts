import { api } from "@/service/api"
import { useCallback } from "react"

export function useFlow() {
  // const BASE_PATH = "/flow";

  const getOrganizationInstancesFlows = useCallback(async () => {

    const response = await api.get("flowsInstances");
    const data = response.data;
    console.log(data);

    return response.data;
  }, []);
  const getOrganizationModelFlows = useCallback(async () => {

    const response = await api.get("flowsModels");
    const data = response.data;
    console.log(data);

    return response.data;
  }, []);

  return {
    getOrganizationInstancesFlows,
    getOrganizationModelFlows
  }
}