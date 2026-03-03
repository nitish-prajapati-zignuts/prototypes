import { NetworkContext } from "@/context/NetworkContext";
import api from "@/services/api";
import React, { useContext, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
}

export default function HomeScreen() {
  //const { registerRetry } = useContext(NetworkContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await api.get<Post[]>("/posts?_limit=5");
      setPosts(res.data);
    } catch (err: any) {
      if (err?.isOffline) {
        //registerRetry(fetchPosts);
      } else {
        console.log("API Error:", err.message);
      }
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Button title="Fetch Posts" onPress={fetchPosts} />

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 6 }}>{item.title}</Text>
        )}
      />
    </View>
    </SafeAreaView>
  );
}