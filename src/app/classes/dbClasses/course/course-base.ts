export class CourseBase {
    constructor(
        public arCode:string,
        public enCode:string,
        public arName:string,
        public enName:string,
        public hours:number,
        public degree:number,
        public description:string,
        public id?:number
    ){}
}
