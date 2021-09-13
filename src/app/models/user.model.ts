import { Faculty } from "./faculty.model";

export class User {
    constructor(
        public userId:number,
        public firstName:string,
        public lastName:string,
        public mobileNo:string,
        public profilePic:string,
        public dob:string,
        public password:string,
        public roleType:number,
        public facultyId:number,
        public assignfaculty:Faculty
    ){}
}