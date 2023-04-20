import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { GetOneUser, User, UserLogin } from './models/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static loginUser(value: any) {
    throw new Error('Method not implemented.');
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };





  constructor(
    private _httpclient:HttpClient,
  ) { }

  create_user(user:User): Observable<any>{
    return this._httpclient.post<User>(API,JSON.stringify(user),this.httpOptions).pipe(
      catchError(this.handleError<User>('Error occured'))
    );
  }
  

  loginUser(user: UserLogin): Observable<any> {
    const data = btoa(user.username + ":" + user.password)
    return this._httpclient.get<UserLogin>(LoginApi,
      {
      headers: new HttpHeaders().set('Authorization', `Basic ${data}`),
    })
      .pipe(
        catchError(this.handleError<UserLogin>('Error occured'))
      );
  }
 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 




}



const API = "http://localhost:5000/users"
const LoginApi = "http://localhost:5000/login"
