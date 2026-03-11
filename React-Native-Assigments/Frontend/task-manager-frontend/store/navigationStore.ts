import { create } from "zustand";

type NavState = {
    pathName:string;
    setPathname:(path:string) => void
}

export const useNavigationStore = create<NavState>((set) => ({
    pathName:"",
    setPathname:(path) => set({pathName:path})
}))