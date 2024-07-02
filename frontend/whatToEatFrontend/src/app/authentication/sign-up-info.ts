export enum UserRole{
    user,
    administrator
}

export class SignUpInfo{
    
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    role: String;
    avatar: String;

    constructor(email: String,
        password: String,
        firstName: String,
        lastName: String,
        role: UserRole,
        avatar: String
    ) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = UserRole[role];
        this.avatar = avatar;
    }
    
       
}