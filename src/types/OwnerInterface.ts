export type OwnerInterface = {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
    role: "owner";
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    status:String
}