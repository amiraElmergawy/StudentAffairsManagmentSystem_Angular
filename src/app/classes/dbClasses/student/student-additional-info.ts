export class StudentAdditionalInfo {
    constructor(
        public birthDate:string,
        public birthPlace:string,
        public address:string,
        public religion:string,
        public motherName:string,
        public fatherProfession:string,
        public nationalityId:number,
        public landPhone:string,
        public mobile:string,
        private id?:number
    ){}
}
