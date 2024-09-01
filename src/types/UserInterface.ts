export type UserInterface = {
    _id: string;
    name: string;
    email: string;
    phoneNumber?:number;
    profilePic?: string;
    role: "user";
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    status:String
  };