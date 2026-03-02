//Actions.tsx
import { useRecoilState, useResetRecoilState } from "recoil";
import { authState } from "./useRecoilAuthState";

export const useAuthRecoilState = () => {
    const [auth,setAuth] = useRecoilState(authState)
    const resetAuth = useResetRecoilState(authState)

    const login = (payload:any,token:string) => {
        setAuth({
            user:payload,
            token:token,
            isAuthenticated:true
        })
    }

    const logout = () => {
        resetAuth()
    }

    return {
        ...auth,
        login,
        logout
    }
}