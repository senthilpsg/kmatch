import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/core/api/auth/auth.service';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  selectOption(option: string) {
    console.log(option); // Handle the option selection
    this.popoverController.dismiss(); // Close the popover
  }

  logout() {
    this.authService.logout(); // Call the logout method from AuthService
    this.popoverController.dismiss(); // Close the popover
  }

}
