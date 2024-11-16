import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { WordpressService } from 'src/app/core/api/wordpress.service';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {
    username: string = '';
    password: string = '';
    error: boolean = false;

    constructor(
        private authService: AuthService,
        private loadingController: LoadingController,
        private router: Router,
        private wordpressService: WordpressService
    ) { }

    async login() {
        this.error = false;

        // Show loading spinner
        const loading = await this.loadingController.create({
            message: 'Logging in...',
            spinner: 'crescent',
        });
        await loading.present();

        // Call the login method
        this.authService.login(this.username, this.password).subscribe(
            async (res: any) => {

                if (res && res.token) {
                    const token = res.token;
                    await this.authService.setToken(res.token);
                    this.wordpressService.setToken(res.token);

                    // Fetch and save user details
                    this.wordpressService.getCurrentUser().subscribe(
                        async (user) => {
                            await loading.dismiss();  // Dismiss the loading spinner
                            //localStorage.setItem('userDetails', JSON.stringify(user));
                            this.authService.setCurrentUser(user);
                            this.router.navigate(['/tab']);
                        },
                        (error) => {
                            console.error('Failed to fetch user details:', error);
                        }
                    );
                    console.log('Login successful!', res.token);

                    // Navigate to dashboard on successful login

                } else {
                    this.error = true;
                }
            },
            async (error: any) => {
                await loading.dismiss();  // Dismiss the loading spinner on error
                this.error = true;
                console.error('Login error', error);
            }
        );
    }
}
