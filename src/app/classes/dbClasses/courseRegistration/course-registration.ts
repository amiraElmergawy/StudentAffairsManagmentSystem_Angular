export class CourseRegistration {
    constructor(
        public studentId:number,
        public courses:[{
            course:number,
            package:number
        }]
    ){}
}
