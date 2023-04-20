import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product} from '../models/product';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _httpclient:HttpClient,
    private storage:Storage,
    ) { this.init()}

  get_all_products(): Observable<Product[]>{
      return this._httpclient.get<Product[]>(API)
  }
  
  add_product(product:Product): Observable<any>{
    return this._httpclient.post<Product>(API,JSON.stringify(product),this.httpOptions).pipe(
      catchError(this.handleError<Product>('Error occured'))
    );
  }


delete_product(id:string): Observable<any>{
  return this._httpclient.delete<Product>(API+"/"+id).pipe(
    catchError(this.handleError<Product>('Error occured'))
  );;
}


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 


  getData(STORAGE_KEY:string){
    return  this.storage.get(STORAGE_KEY) || [];
  }


  async addData(STORAGE_KEY:string, data:number[]){
    console.log(data)
    const arr = await this.getData('price')
    if(arr){
      const arr2 = [... await arr, ...data]
      return this.storage.set(STORAGE_KEY,arr2);
    }
    return this.storage.set(STORAGE_KEY,[]);
    
  }

  removeData(STORAGE_KEY:string){
    return this.storage.remove(STORAGE_KEY)
  }

  init(){
    this.storage.create();
    //this.storage.clear();
  }


}

const API = "http://localhost:5000/product"