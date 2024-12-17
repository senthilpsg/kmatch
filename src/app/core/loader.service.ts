import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  // Show loader
  async showLoader(message: string = 'Loading...'): Promise<void> {
    // Ensure no loader is already present
    if (this.loading) {
      await this.dismissLoader();
    }

    // Create a new loader
    this.loading = await this.loadingController.create({
      message,
      spinner: 'crescent', // You can change the spinner type
      translucent: true,
      backdropDismiss: false, // Prevent dismissing by tapping the backdrop
    });

    await this.loading.present();
  }

  // Dismiss loader
  async dismissLoader(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  async hideLoader() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  // Toast Methods
  async showToast(
    message: string,
    duration: number = 2000,
    color: string = 'primary',
    position: 'bottom' | 'top' | 'middle' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position,
    });
    await toast.present();
  }

  // Success Toast Method
  async showSuccess(message: string, duration: number = 2000) {
    await this.showToast(message, duration, 'success', 'bottom');
  }

  // Error Toast Method
  async showError(message: string, duration: number = 2000) {
    await this.showToast(message, duration, 'danger', 'bottom');
  }
}
