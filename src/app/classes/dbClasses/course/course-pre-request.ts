export class CoursePreRequest {
    constructor(
        public coursesOperation:number, //1= OR , 2= AND  Between courses
        public courses:number [],
        public operationWithNext:number,  //1= OR , 2= AND Between packages
        public id?:number
    ){}
}
