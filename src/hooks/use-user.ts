import { UserSignInDTO, UserSignUpDTO } from "@/lib/DTO/user.dto";
import { api } from "@/service/api";
import { useUserStore } from "@/store/user";
import { useCallback } from "react"
import { useNavigate } from "react-router-dom";

export function useUser() {
  const PATH = "/users"
  const clearUser = useUserStore(state => state.clearUser);
  const setSelectedOrganization = useUserStore(state => state.setSelectedOrganization);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    clearUser();
    localStorage.removeItem("@plune-app/token")
    setSelectedOrganization(null)
    navigate("/")
  }, [clearUser]);

  const update = useCallback(() => { }, []);

  const signIn = useCallback(async (data: UserSignInDTO) => {
    const response = await api.post(PATH + "/signIn", data)
    return response.data
  }, []);

  const signUp = useCallback(async (data: UserSignUpDTO) => {
    const response = await api.post(PATH + "/signUp", data)
    return response.data
  }, []);
 
  return {
    logout,
    update,
    signIn,
    signUp
  }
}