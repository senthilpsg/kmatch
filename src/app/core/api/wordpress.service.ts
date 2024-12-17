import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/api/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class WordpressService {
    private apiUrl = 'https://konguvellalar.in/wp-json/wp/v2';
    private token = '';
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getPosts(userId?: number): Observable<any> {
        let url = `${this.apiUrl}/posts`;
        if (userId) {
            url += "?author=${userId}";
        }
        return this.http.get(url);
    }

    getPostsWithImages(userId?: number): Observable<any> {
        let url = `${this.apiUrl}/posts?_embed`;
        if (userId) {
            url += `&author=${userId}`;
        }
        return this.http.get(url);
    }
    /**
     * Fetch a single post by its ID.
     * @param {number} id - The ID of the post to retrieve.
     * @returns {Observable<any>} An observable containing the post data.
     */
    getPost(id: number): Observable<any> {
        // Perform a GET request to fetch the post with the specified ID
        return this.http.get(`${this.apiUrl}/posts/${id}?_embed`);
    }

    getCategories(): Observable<any> {
        return this.http.get(`${this.apiUrl}/categories`);
    }

    getCategory(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/categories/${id}`);
    }

    getCurrentUser(): Observable<any> {
        return from(this.getToken()).pipe(
            switchMap((token) => {
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                });

                return this.http.get<any>(`${this.apiUrl}/users/me`, { headers });
            })
        );
    }

    // Create a new post with post meta
    // Directly return the Observable instead of Promise<Observable>
    createPost(postData: any): Observable<any> {
        return from(this.getToken()).pipe(
            switchMap(token => {
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });

                return this.http.post(`${this.apiUrl}/posts`, postData, { headers });
            })
        );
    }

    deletePost(postId: number): Observable<any> {
        // const url = `${this.apiUrl}/posts/${postId}?force=true`; // Replace this.apiUrl with your WordPress REST API URL
        // const headers = new HttpHeaders({
        //   'Authorization': `Bearer ${this.token}`, // Replace `this.token` with your JWT token
        // });

        // return this.http.delete(url, { headers });

        return from(this.getToken()).pipe(
            switchMap(token => {
                const url = `${this.apiUrl}/posts/${postId}?force=true`; // Replace this.apiUrl with your WordPress REST API URL
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });

                return this.http.delete(url, { headers });
            })
        );
    }

    // Method to set the token, in case it needs to be updated manually
    setToken(token: string) {
        this.token = token;
    }

    // Asynchronous method to retrieve the token from the AuthService
    async getToken(): Promise<string> {
        if (!this.token) {
            this.token = await this.authService.getToken(); // Fetch the token if not already available
        }
        return this.token;
    }
}