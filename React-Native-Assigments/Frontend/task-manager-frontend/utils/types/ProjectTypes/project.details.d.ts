export interface UserData {
    _id: string;
    name: string;
    email: string;
}

export interface ProjectData {
    _id: string;
    title: string;
    description: string;
    userId: UserData;
    isDeleted: boolean;
}
