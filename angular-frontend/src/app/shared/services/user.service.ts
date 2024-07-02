import { Injectable, inject} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';


const API_URL = `${environment.apiURL}/`

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  http: HttpClient = inject(HttpClient);
  
  login(username: string, password: string) {
    return this.http.post<any>(API_URL + 'accounts/api/auth/',
      { username, password }, httpOptions).pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user))
            this.loggedIn.next(true);
            console.log(`${user} logged in`);
          }
          return user
      })
    )
  }

  logout() {
    localStorage.removeItem('currentUser') 
    console.log(`Logout`);
    this.loggedIn.next(false);
  }
  
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
  




