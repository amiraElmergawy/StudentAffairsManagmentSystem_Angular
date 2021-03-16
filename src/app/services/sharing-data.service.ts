import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  // this service used to sharing the data between sibling components
  // simply takes data from component (by setData method)
  // and the other component get this data (getData method)

  private data:any ;
 constructor(){}
  setData(data:any){
      this.data = data;
  }

  getData():any{
      return this.data;
  }
}
