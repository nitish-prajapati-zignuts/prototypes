import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import NetInfo from "@react-native-community/netinfo";

import { QueryClient,onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";


onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
        setOnline((!!state.isConnected))
    })
})

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            networkMode:"offlineFirst",
            staleTime:1000 * 60 * 5,
            retry:2
        },
        mutations:{
            networkMode:"offlineFirst"
        }
    }
});

const persister = createAsyncStoragePersister({
    storage:AsyncStorage
})

export default function QueryProvider({children}:any){
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
            {children}
        </PersistQueryClientProvider>
    )
}