import { Department } from '../department/department';
export class StudentBase {
    constructor(
        public ssn:string,
        public passportNumber:string,
        public arFirstName:string,
        public arSecondName:string,
        public arThirdName:string,
        public arFamilyName:string,
        public enFirstName:string,
        public enSecondName:string,
        public enThirdName:string,
        public enFamilyName:string,
        public gender:boolean,
        public image:File,
        public currentProgram:number,
        public currentDepartment:number,
        public currentMajor:number,
        public collageEmail?:string,
        public id?:number,
        public fullEnName?:string,
        public fullArName?:string,
        public academicCode?:number
    ){}
}
