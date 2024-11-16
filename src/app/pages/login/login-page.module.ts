import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageRoutingModule } from './login-page.routing.module';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        IonicStorageModule.forRoot(),
        LoginPageRoutingModule
    ],
    declarations: [LoginPage],
})
export class LoginPageModule { }
