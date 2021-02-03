export class Program {
    constructor(
       public arName:string,
       public enName:string,
       public departmentId:number,
       public semester:number,
       public isMajor:boolean,//true if major false if not
       public majorId:number,
       public semesterHours:number,
       public parentId:number,
       public id?:number 
    ){}
}

