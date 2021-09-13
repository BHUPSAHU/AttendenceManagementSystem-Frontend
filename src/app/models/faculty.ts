import { Subject } from "./subject";

export class Faculty {
  
    constructor(
        public facultyid:number,
        public userName:string,
        public totalClass:string,
        public subjectId:number,
        public subjectList:Subject[]
        
    ){

    }
}