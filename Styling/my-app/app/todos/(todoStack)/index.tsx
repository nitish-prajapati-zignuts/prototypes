import AppText from '@/components/AppText';
import Loading from '@/components/Loading';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    ownerId: string;
    assignedTo: string;
    assignedUserDetails: AssignedUserDetails;
};

type AssignedUserDetails = {
    id: string;
    email: string;
    role: string;
};

export function getStatus(status:string){
    if(status === 'pending'){
        return 'grey'
    }
    else if(status === 'in-progress'){
        return 'green'
    }
    else{
        return 'orange'
    }
}

export default function AllTodo() {
    const [value, setValue] = useState<Task[]>([]);
    const [isLoading,setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                if (Platform.OS === 'web') {
                    const response = await fetch('http://192.168.2.1:3001/api/tasks');
                    const res = await response.json();
                    setValue(res.tasksWithOwner);
                } else {
                    const response = await fetch(
                        'https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/tasks',
                    );

                    const res = await response.json();
                    setValue(res.tasksWithOwner);
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log('ERROR:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 24 }}>
                <AppText size="hero" weight="bold">
                    Hi, Nitish
                </AppText>
                <AppText size="sm">Welcome back</AppText>
            </View>

            {/* 👇 FlatList Outside Header View */}
            <FlatList
                data={value}
                numColumns={Platform.OS === "web" ? 2 : 1}
                keyExtractor={(item) => item.id}
                style={styles.list}
                bounces
                contentContainerStyle={styles.container}
                //columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <Pressable onPress={() => router.push(`/todos/${item.id}`)}>
                    <View style={styles.card}>
                        <View style={{display:"flex", flexDirection:'row',justifyContent:'space-between'}}>
                            <View><Text numberOfLines={1} style={styles.text}>
                                {item.title}
                            </Text>
                                <Text numberOfLines={1} style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
                            <View><Text  style={{backgroundColor:getStatus(item.status),padding:12,borderRadius:12}}>{item.status}</Text></View>
                        </View>

                        <View>
                            <Text>Assigned To:- </Text>
                            <Text >{item.assignedTo.charAt(0).toUpperCase() + item.assignedTo.slice(1).toLowerCase()}</Text>
                        </View>
                    </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginTop: 16,
    },
    container: {
        padding: 12,
    },
    card: {
        flex: 1,
        margin: 8,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});
