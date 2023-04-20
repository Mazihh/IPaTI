import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage:Storage) { 
    this.init()
  }

  getToken(STORAGE_KEY:string){
    return  this.storage.get(STORAGE_KEY) || "No Token";
  }
  
 async addToken(STORAGE_KEY:string, token:string[]){
  return this.storage.set(STORAGE_KEY,token);  
}
removeToken(STORAGE_KEY:string){
  return this.storage.remove(STORAGE_KEY)
}

init(){
  this.storage.create();
  //this.storage.clear();
}


}
