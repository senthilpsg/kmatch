import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';  // To store JWT in local storage or use capacitor storage for better security
import { first, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://konguvellalar.in/wp-json/jwt-auth/v1/token';
    private tokenKey = 'token';
    private currentUserId: any;
    private currentUserName: any;
    private currentUserKey = 'currentUser';

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private router: Router
    ) {
        this.init();
    }

    // Initialize storage
    async init() {
        await this.storage.create();
    }

    // Login function
    login(username: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl, {
            username,
            password
        });
    }

    async logout() {
        await this.storage.remove('token'); // Adjust this based on how you store the JWT
        this.router.navigate(['/login']); // Redirect to the login page
    }

    // Store JWT Token
    async setToken(token: string) {
        await this.storage.set(this.tokenKey, token);
    }

    // Get JWT Token
    async getToken() {
        return await this.storage.get(this.tokenKey);
    }

    async setCurrentUser(user: any) {

        this.currentUserId = user.id;
        this.currentUserName = user.name;
        console.log('user', user);
        return await this.setData(this.currentUserKey, user);
    }

    async getCurrentUserDetails() {
        return await this.getData(this.currentUserKey);
    }

    async setData(key: string, userData: any) {
        return await this.storage.set(key, userData);
    }

    async getData(key: string) {
        return await this.storage.get(key);
    }
    async getCurrentUserId(): Promise<number> {
        const user = await this.getCurrentUserDetails();
        return user.id;
    }

    getCurrentUserName() {
        return this.currentUserName;
    }
}
