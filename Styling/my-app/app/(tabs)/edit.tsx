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
    View,
    RefreshControl,
    Modal,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
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

export const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return { bg: '#F3F4F6', text: '#6B7280' };
        case 'in-progress':
            return { bg: '#EBF5FF', text: '#3B82F6' };
        case 'completed':
            return { bg: '#ECFDF5', text: '#10B981' };
        default:
            return { bg: '#FFF7ED', text: '#F97316' };
    }
};

export default function Edit() {
    const [value, setValue] = useState<Task[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [task, setTask] = useState<Task | null>(null);
    const [id, setId] = useState("");
    const [isModalLoading,setModalLoading] = useState(false)
    const [isSavingState,setSavingState] = useState(false)

    const handleEmailChange = (newEmail: string) => {
        if (!task) return;

        setTask({
            ...task,
            assignedUserDetails: {
                ...task.assignedUserDetails,
                email: newEmail,
            },
        });
    };

    const handleTitleChange = (title: string) => {
        if (!task) return;

        setTask({
            ...task,
            title: title
        })
    }

    const handleDescriptionChange = (text: string) => {
        setTask((prevTask) => {
            if (!prevTask) return null;
            return {
                ...prevTask,
                description: text
            };
        });
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const url =
                Platform.OS === 'web'
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveState = () => { 
        console.log("Handling State Changes",task)

        setSavingState(true)

        setTimeout(() => {
            setSavingState(false)
            setVisible(false)
        },3000)

        


    };

    const fetchDataBySingle = async (id: string) => {
        try {
            setModalLoading(true)
            const idx = Number(id)
            const resp = await fetch(
                `https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/tasks/${idx}`,
            );

            if (resp.status !== 200) {
                setError(resp.statusText);
                //console.log(resp.statusText)
                return;
            }

            const data = await resp.json();
            console.log(data)

            setTask(data);
            setModalLoading(false)
        } catch (error) {
            console.error('Error fetching task:', error);
        } finally {
            setModalLoading(false)
        }
    };

    useEffect(() => {

        if (visible === true) {
            fetchDataBySingle(id)
        }
    }, [visible]);

    if (isLoading && value.length === 0) return <Loading />;

    return (
        <>
            <SafeAreaView>
                <Modal
                    visible={visible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHandle} />

                            <Text style={styles.modalTitle}>Edit Task</Text>

                            {isModalLoading ? <View style={{flex:1}}>
                                <ActivityIndicator /> 
                            </View>: 
                                   <View style={styles.modalBody}>
                                <View>
                                    <Text style={styles.label}>Title</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your Title"
                                        value={task?.title}
                                        editable
                                        onChangeText={handleTitleChange}
                                    ></TextInput>
                                </View>

                                <View>
                                    <Text style={styles.label}>Description</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your Description"
                                        value={task?.description}
                                        editable
                                        onChangeText={handleDescriptionChange}
                                    ></TextInput>
                                </View>

                                <View>
                                    <Text style={styles.label}>Assigned To</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your Email"
                                        value={task?.assignedUserDetails.email}
                                        editable
                                        onChangeText={handleEmailChange}
                                    ></TextInput>
                                </View>
                            </View>
                            }

                         

                            <View>
                                <Pressable style={styles.closeButton} onPress={() => handleSaveState()}>
                                   {isSavingState ? <><ActivityIndicator color="black"/></> : <Text style={styles.closeButtonText}>Save</Text>}
                                </Pressable>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={() => setVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <AppText className="lg">Your Tasks</AppText>
        
                </View>

                <FlatList
                    data={value}
                    numColumns={Platform.OS === 'web' ? 2 : 1}
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
                                style={({ pressed }) => [
                                    styles.card,
                                    pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
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
                                    <View
                                        style={[styles.badge, { backgroundColor: statusStyle.bg }]}
                                    >
                                        <Text
                                            style={[styles.badgeText, { color: statusStyle.text }]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardFooter}>
                                    <View style={styles.assigneeContainer}>
                                        <AntDesign
                                            name="edit"
                                            size={24}
                                            color="black"
                                            onPress={() => {
                                                setVisible(true);
                                                setId(item.id);
                                            }}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        );
                    }}
                />
            </View>
        </>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalBody: {
        flex: 1,
        gap: 16,
    },
    field: {
        gap: 12,
    },
    closeButton: {
        backgroundColor: '#3B82F6',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#888',
        padding: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});
