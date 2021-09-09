
import { Student } from "./student";

export class Attendance {
    constructor(
        public attendanceId:number,
        public studentId:number,
        public student :Student,
        public semester:string,
        public subjectName:string,
        public courseId:number,
        public courseName:string,
        public attendanceDate:Date,
        public totalClass:string,
        public status:number,
        public total:number,
        public percentage:string
    ){}
}

