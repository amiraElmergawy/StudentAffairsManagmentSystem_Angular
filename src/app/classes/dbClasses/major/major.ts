export class Major {
    constructor(
        public type:number,
        public arName:string,
        public enName:string,
        public desc:string,
        public certArName:string,
        public certEnName:string,
        public hoursToGraduate:number,
        public failHoursAllowed:number,
        public failGpa:number,
        public hSDept:number,
        public departmentId:number,
        public divisionId:number,
        public id?:number
    ){}
}
