import AppText from '@/components/AppText';
import Loading from '@/components/Loading';
import { getItem } from '@/components/store';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    RefreshControl,
} from 'react-native';

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

// Refined status colors and helper
export const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return { bg: '#F3F4F6', text: '#6B7280' }; // Gray
        case 'in-progress':
            return { bg: '#EBF5FF', text: '#3B82F6' }; // Blue
        case 'completed':
            return { bg: '#ECFDF5', text: '#10B981' }; // Green
        default:
            return { bg: '#FFF7ED', text: '#F97316' }; // Orange
    }
};

export default  function AllTodo() {
    const [value, setValue] = useState<Task[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userDetails,setUserDetails] = useState("")
    


    const fetchData = async () => {
        try {
            setLoading(true);
            const url = Platform.OS === 'web' 
                ? 'http://192.168.2.1:3001/api/tasks' 
                : 'https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/tasks';
            
            const response = await fetch(url);
            const res = await response.json();
            setValue(res.tasksWithOwner);
        } catch (error) {
            console.log('ERROR:', error);
        } finally {
            setLoading(false);
        }
    };

    const setData = async () => {
        const dt = await getItem()
           const user = JSON.parse(dt!)
           console.log(user.data.name);
           
        setUserDetails(user.data.name)
    }
    

    useEffect(() => {
        fetchData();
        setData()

     
    }, []);

    if (isLoading && value.length === 0) return <Loading />;

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View>
                    <AppText size="hero" weight="bold" style={styles.welcomeText}>
                        Hi, {userDetails}
                    </AppText>
                    <AppText size="sm" style={styles.subText}>You have {value.length} tasks today</AppText>
                </View>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>N</Text>
                </View>
            </View>

            <FlatList
                data={value}
                numColumns={Platform.OS === "web" ? 2 : 1}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
                }
                renderItem={({ item }) => {
                    const statusStyle = getStatusStyles(item.status);
                    return (
                        <Pressable 
                            onPress={() => router.push(`/todos/${item.id}`)}
                            style={({ pressed }) => [
                                styles.card,
                                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
                            ]}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={1} style={styles.taskTitle}>
                                        {item.title}
                                    </Text>
                                    <Text numberOfLines={2} style={styles.description}>
                                        {item.description}
                                    </Text>
                                </View>
                                <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                                    <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.cardFooter}>
                                <View style={styles.assigneeContainer}>
                                    <View style={styles.dot} />
                                    <Text style={styles.assigneeLabel}>Assigned to: </Text>
                                    <Text style={styles.assigneeName}>
                                        {item.assignedTo.charAt(0).toUpperCase() + item.assignedTo.slice(1).toLowerCase()}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    welcomeText: {
        letterSpacing: -0.5,
    },
    subText: {
        color: '#6B7280',
        marginTop: 2,
    },
    avatarPlaceholder: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    avatarText: {
        fontWeight: 'bold',
        color: '#374151',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 4,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // Elevation for Android
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        marginRight: 10,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 18,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    cardFooter: {
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F9FAFB',
    },
    assigneeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#3B82F6',
        marginRight: 8,
    },
    assigneeLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    assigneeName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
});