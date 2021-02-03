export class CourseStatus {
    constructor(
        public activeStatus:boolean,
        public semester:number,
        public courseId?:number,
        public programId?:number
    ){}
}
