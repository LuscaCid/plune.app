import { api } from "@/service/api"
import { useCallback } from "react"

export function useFlow() {
  // const BASE_PATH = "/flow";

  const getOrganizationFlows = useCallback(async () => {
    console.log("data");

    const response = await api.get("flows");
    const data = response.data;
    console.log(data);

    return response.data;
  }, []);

  return {
    getOrganizationFlows
  }
}