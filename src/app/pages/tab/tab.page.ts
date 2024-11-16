import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { PopoverController } from '@ionic/angular';
import { MenuPopoverComponent } from 'src/app/shared/custom-components/menu-popover/menu-popover.component'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  constructor(
    private authService: AuthService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }



  async openMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event, // Pass the event to position the popover
      translucent: true,
    });
    return await popover.present();
  }
}
