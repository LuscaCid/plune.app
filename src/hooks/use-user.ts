import { useCallback } from "react"

export function useUser() {
  const logout = useCallback(() => { }, []);
  const update = useCallback(() => { }, [])
  const signin = useCallback(() => { }, [])
  return {
    logout,
    update,
    signin,
  }
}