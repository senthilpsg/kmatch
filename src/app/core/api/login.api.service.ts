import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const url = 'https://konguvellalar.in/wp-json/jwt-auth/v1/token';
    const params = {
      username: username,
      password: password
    }
    return this.http.post(url, params, this.httpOptions);
  }
}
