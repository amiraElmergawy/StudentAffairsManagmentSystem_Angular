export class Prepackage {
    constructor(
        public kind:number,/**1=> package is normal and it contains only FORCED courses
        2=> package is normal and it contains OPTIONAL courses
        3=> package is normal and it contains UNIVERSITY courses (optional) */
        public hoursToReg:number,//The number of credit hours the student should register from this package
        public semester:number,
        public orderOfShowing:number,
        public courses:number[],
        public id?:number
    ){}
}
