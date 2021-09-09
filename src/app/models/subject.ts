import { Course } from "./course";

export class Subject 
{
    constructor
    (
    public subjectId:number,
     public subjectName:string,
     public subjectCode:string,
     public semester:string,
     public description:string,
     public courseId :number,
     public course:Course
    )
    {

    }
}