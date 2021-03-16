export class StudentSpecialRegistration {
    constructor(
        public wafed:boolean,
        public wafedFrom:string,
        public transferred:boolean,
        public transferredFrom:string,
        public registrationTransferred:boolean,
        public registrationTransferredFrom:string,
        private id?:number
    ){}
}
