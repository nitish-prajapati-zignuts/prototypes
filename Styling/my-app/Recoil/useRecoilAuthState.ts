//useRecoilAuthState
import AsyncStorage from '@react-native-async-storage/async-storage'
import {atom,DefaultValue} from 'recoil'

const persistAtom = (key:string) => ({setSelf,onSet}:any) => {
    const loadPersisted = async () => {
        const savedValue = await AsyncStorage.getItem(key);
        if(savedValue != null){
            setSelf(JSON.parse(savedValue))
        }
    };

    loadPersisted();

    onSet((newValue:any,_:any,isReset:boolean) => {
        if(isReset){
            AsyncStorage.removeItem(key)
        }else{
            AsyncStorage.setItem(key,JSON.stringify(newValue))
        }
    })
};

export interface AuthState{
    user:any | null;
    token:string | null;
    isAuthenticated:boolean
}

export const authState = atom<AuthState>({
    key:'authState',
    default:{
        user:null,
        token:null,
        isAuthenticated:false
    },
    effects:[persistAtom('auth-storage')]
})

